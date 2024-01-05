import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { RolesGuard } from 'src/roles/roles.guard';
import { InfinityPaginationResultType } from 'src/utils/types/infinity-pagination-result.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { Assignment } from './entities/assignment.entity';

import { UpdateAssignmentDto } from './dto/update.dto';
import { AssignmentService } from './assignment.service';
import { StatusEnum } from 'src/statuses/statuses.enum';
import { SubmissionQuestion } from '../submission-question/entities/submission-question.entity';
import { SubmissionQuestionService } from '../submission-question/submission-question.service';
import { NotificationsService } from 'src/modules/notifications/notifications.service';
import { IIFE } from 'src/modules/chat/chat-message/chat.gateway';
import { LessonsService } from 'src/modules/lessons/lessons.service';
import { Lessons } from 'src/modules/lessons/entities/lessons.entity';
import { Notifications } from 'src/modules/notifications/entities/notifications.entity';

const relations = [
  {
    field: 'exercise',
    entity: 'exercise',
  },
  {
    field: 'exercise.questions',
    entity: 'question',
  },
  {
    field: 'question.options',
    entity: 'option',
  },
];

@ApiBearerAuth()
@ApiTags('Assignment')
@Roles()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({
  path: 'assignment',
  version: '1',
})
export class AssignmentController {
  constructor(
    private readonly assignmentService: AssignmentService,
    private readonly submissionQuestionService: SubmissionQuestionService,
    private readonly notifications: NotificationsService,
    private readonly lessonsService: LessonsService,
  ) {}
  @Roles(RoleEnum.WEB_ADMIN, RoleEnum.PESONAL_TUTOR)
  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAssignmentDto: any): Promise<Assignment[]> {
    IIFE(async () => {
      const id = +createAssignmentDto?.lesson as number;
      const lesson = await this.lessonsService.findOne(id, [
        {
          field: 'collaboration',
          entity: 'collaboration',
        },
        {
          field: 'collaboration.posts',
          entity: 'posts',
        },
        {
          field: 'posts.user',
          entity: 'user',
        },
      ]);

      if (lesson) {
        const data = {
          user: { id: lesson?.collaboration?.posts?.user?.id },
          ['text_VI']: `<a href='/classes/${lesson.collaboration?.id}?lesson=${lesson.id}'>[${lesson?.collaboration?.nameClass}] Bạn có một bài tập mới được giao vào lúc ${createAssignmentDto?.startTime} đến  ${createAssignmentDto?.endTime}  </a>`,
          ['text_EN']: `<a href='/classes/${lesson.collaboration?.id}?lesson=${lesson.id}'>[${lesson?.collaboration?.nameClass}] You have a new assignment due at ${createAssignmentDto?.startTime} to  ${createAssignmentDto?.endTime}  </a>`,
        };
        void this.notifications.create(data as Notifications);
      }
    });

    return this.assignmentService.create({
      ...createAssignmentDto,
    });
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'searchName', required: false })
  @ApiQuery({ name: 'sortBy', required: false })
  @ApiQuery({ name: 'sortDirection', required: false })
  @ApiQuery({ name: 'sortBy', required: false })
  @ApiQuery({ name: 'fieldSearch', required: false })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(1000), ParseIntPipe) limit: number,
    @Query('sortBy', new DefaultValuePipe('title')) sortBy: string,
    @Query('sortDirection', new DefaultValuePipe('ASC')) sortDirection: string,
    @Query('status', new DefaultValuePipe(0), ParseIntPipe) status: number,
    @Query('fieldSearch', new DefaultValuePipe('title')) fieldSearch: string | string[],
    @Query('searchName', new DefaultValuePipe('')) searchName: string,
  ): Promise<InfinityPaginationResultType<Assignment>> {
    if (limit > 50) {
      limit = 1000;
    }

    return await this.assignmentService.findManyWithPagination({
      page,
      limit,
      status,
      sortBy,
      sortDirection,
      searchName,
      fieldSearch,
      relations,
    });
  }

  @Get('/active')
  @HttpCode(HttpStatus.OK)
  getActive(): Promise<Assignment[]> {
    return this.assignmentService.findManyActive(StatusEnum['active']);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<NullableType<Assignment>> {
    return this.assignmentService.findOne({ id: +id }, relations);
  }

  @Roles(RoleEnum.WEB_ADMIN, RoleEnum.PESONAL_TUTOR, RoleEnum.STUDENT)
  @SerializeOptions({
    groups: ['tutor'],
  })
  @Get('/review/:id')
  @HttpCode(HttpStatus.OK)
  async findReview(@Param('id') id: string): Promise<NullableType<Assignment>> {
    const assignment = await this.assignmentService.findOne({ id: +id }, [
      ...relations,
      {
        field: 'submissionQuestions',
        entity: 'submissionQuestion',
      },
    ]);

    assignment?.exercise?.questions?.forEach((question) => {
      const submission = assignment?.submissionQuestions?.find(
        (submission) => question.id === submission.questionId,
      );
      question['isCorrect'] = submission?.isCorrect || false;
      question['answer'] = submission?.answer;
    });
    if (assignment instanceof Assignment) {
      delete assignment['submissionQuestions'];
    }

    return assignment;
  }

  @Roles(RoleEnum.STUDENT)
  @Post('/submission/:id')
  @HttpCode(HttpStatus.OK)
  async submission(
    @Param('id') id: number,
    @Body() payload: any,
  ): Promise<SubmissionQuestion[] | null> {
    const assignment = await this.assignmentService.findOne({ id: +id }, relations);
    let score = 0;
    const dataSubmission =
      payload?.answers?.map((answer: any) => ({
        assignmentId: Number(id),
        questionId: Number(answer.questionId),
        answer: answer.answer,
        isCorrect: false,
      })) || [];

    dataSubmission?.forEach((answer) => {
      const question = assignment?.exercise?.questions.find(
        (question) => question?.id === answer?.questionId,
      );
      if (question?.type === 0) {
        const correct = question?.options?.find((option) => option.isCorrect);
        if (correct?.id === Number(answer?.answer)) {
          score = score + question.score;
          answer['isCorrect'] = true;
        } else {
          answer['isCorrect'] = false;
        }
      }
      if (question?.type === 1) {
        const answers = answer?.answer?.split(',');
        const corrects = question?.options?.filter((option) => option.isCorrect);
        const isCorrect = corrects?.every((option) => answers?.includes(String(option.id)));
        if (isCorrect) {
          score = score + question.score;
        }
        answer['isCorrect'] = isCorrect;
      }
    });

    const submissionQuestion = await this.submissionQuestionService.createMany(dataSubmission);

    void this.assignmentService.update(id, { status: 2, score: score });

    return submissionQuestion;
  }
  @Get('/collab/:id')
  @Roles(RoleEnum.PESONAL_TUTOR, RoleEnum.PESONAL_TUTOR, RoleEnum.STUDENT)
  @HttpCode(HttpStatus.OK)
  async findAssignmentByCollap(@Param('id') id: string): Promise<NullableType<Assignment[]>> {
    return this.assignmentService.findAssignmentByCollap(Number(id));
  }

  @Roles(RoleEnum.WEB_ADMIN, RoleEnum.PESONAL_TUTOR)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: number,
    @Body() updateAssignmentDto: UpdateAssignmentDto,
  ): Promise<Assignment[]> {
    return this.assignmentService.update(id, updateAssignmentDto);
  }
  @Roles(RoleEnum.WEB_ADMIN, RoleEnum.PESONAL_TUTOR)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number): Promise<void> {
    return this.assignmentService.softDelete(id);
  }
}
