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
  Request,
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
import { Question } from './entities/question.entity';

import { CreateQuestionDto } from './dto/create.dto';
import { UpdateQuestionDto } from './dto/update.dto';
import { QuestionService } from './question.service';
import { StatusEnum } from 'src/statuses/statuses.enum';
import { OptionService } from '../option/option.service';
import { IWhere } from 'src/core/base.service';
import { differenceBy, differenceWith, isEmpty } from 'lodash';

const relations = [
  {
    field: 'options',
    entity: 'option',
  },
  {
    field: 'gradeLevel',
    entity: 'gradeLevel',
  },
  {
    field: 'subject',
    entity: 'subject',
  },
];
@ApiBearerAuth()
@ApiTags('Question')
@Roles()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({
  path: 'question',
  version: '1',
})
export class QuestionController {
  constructor(
    private readonly questionService: QuestionService,

    private readonly optionService: OptionService,
  ) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createQuestionDto: any, @Request() request: any): Promise<Question[]> {
    const userId = request?.user?.id;
    const question = await this.questionService.create({
      content: createQuestionDto.content,
      type: createQuestionDto.type,
      status: createQuestionDto.status,
      level: createQuestionDto.status,
      score: createQuestionDto.score,
      gradeLevelId: createQuestionDto.gradeLevel,
      subjectId: createQuestionDto.subject,
      author: userId,
      isPublish: createQuestionDto.isPublish,
    });
    const questionId = (question as unknown as Question)?.id;

    if (createQuestionDto.options && questionId) {
      const options = createQuestionDto.options?.map((option) => ({
        ...option,
        question: questionId,
      }));
      void this.optionService.createMany(options);
    }
    return question;
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'searchName', required: false })
  @ApiQuery({ name: 'sortBy', required: false })
  @ApiQuery({ name: 'sortDirection', required: false })
  @ApiQuery({ name: 'sortBy', required: false })
  @ApiQuery({ name: 'fieldSearch', required: false })
  @ApiQuery({ name: 'gradeLevel', required: false })
  @ApiQuery({ name: 'subject', required: false })
  @SerializeOptions({
    groups: ['tutor'],
  })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(1000), ParseIntPipe) limit: number,
    @Query('sortBy', new DefaultValuePipe('content')) sortBy: string,
    @Query('sortDirection', new DefaultValuePipe('ASC')) sortDirection: string,
    @Query('status', new DefaultValuePipe(1), ParseIntPipe) status: number,
    @Query('fieldSearch', new DefaultValuePipe('content')) fieldSearch: string | string[],
    @Query('searchName', new DefaultValuePipe('')) searchName: string,
    @Query('gradeLevel', new DefaultValuePipe(0)) gradeLevel: number,
    @Query('subject', new DefaultValuePipe(0)) subject: number,
    @Query('author', new DefaultValuePipe(0)) author: number,
    @Query('level', new DefaultValuePipe(0)) level: number,

    @Request() request: any,
  ): Promise<InfinityPaginationResultType<Question>> {
    if (limit > 50) {
      limit = 1000;
    }
    const userId = request?.user?.id;
    console.log('🚀 ~ file: question.controller.ts:123 ~ QuestionController ~ userId:', userId);

    let where: IWhere[] = [];
    if (author === 0) {
      where = [...where, { field: 'isPublish', value: true }];
    }
    if (author === 1) {
      where = [...where, { field: 'author', value: userId }];
    }
    if (subject) {
      where = [...where, { field: 'subject', value: subject }];
    }
    if (gradeLevel) {
      where = [...where, { field: 'gradeLevelId', value: gradeLevel }];
    }
    if (level) {
      where = [...where, { field: 'level', value: level }];
    }
    return await this.questionService.findManyWithPagination({
      page,
      limit,
      status,
      sortBy,
      sortDirection,
      searchName,
      fieldSearch,
      relations,
      where,
    });
  }

  @Get('/active')
  @HttpCode(HttpStatus.OK)
  getActive(): Promise<Question[]> {
    return this.questionService.findManyActive(StatusEnum['active']);
  }
  @SerializeOptions({
    groups: ['tutor'],
  })
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<NullableType<Question>> {
    return this.questionService.findOne({ id: +id }, relations);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: number,
    @Body() updateQuestionDto: any,
  ): Promise<Question[] | null> {
    const optionsUpdate: any = updateQuestionDto?.options?.map((item) => ({
      optionId: Number(item?.id),
      content: item.content,
      isCorrect: item.isCorrect,
    }));
    if (optionsUpdate) {
      const options = await this.optionService.findMany({ questionId: id });

      if (options) {
        const newRow = differenceWith(optionsUpdate, options, (source: any, compare) => {
          return (
            source?.content === compare.content &&
            source?.isCorrect === compare.isCorrect &&
            source?.optionId === compare.id
          );
        }).map(({ isCorrect, content }) => ({
          isCorrect,
          content,
          question: id,
        }));

        const deleteRow = differenceWith(options, optionsUpdate, (source: any, compare: any) => {
          return (
            source?.content === compare?.content &&
            source?.isCorrect === compare?.isCorrect &&
            source?.id === compare?.optionId
          );
        }).map((item) => item?.id);

        !isEmpty(newRow) && void this.optionService.createMany(newRow);
        !isEmpty(deleteRow) &&
          deleteRow.forEach((id) => {
            void this.optionService.softDelete(id);
          });
      }
    }
    console.log(
      '🚀 ~ file: question.controller.ts:213 ~ QuestionController ~ question.updateQuestionDto:',
      updateQuestionDto,
    );

    const question = {
      content: updateQuestionDto.content,
      type: updateQuestionDto.type,
      status: updateQuestionDto.status,
      level: updateQuestionDto.status,
      score: updateQuestionDto.score,
      gradeLevelId: updateQuestionDto.gradeLevel,
      subjectId: updateQuestionDto.subject,
    };
    // return null;
    return await this.questionService.update(id, question);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number): Promise<void> {
    return this.questionService.delete(id);
  }
}
