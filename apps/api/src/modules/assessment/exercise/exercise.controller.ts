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
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Request,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { InfinityPaginationResultType } from 'src/utils/types/infinity-pagination-result.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { Exercise } from './entities/exercise.entity';
import { UpdateExerciseDto } from './dto/update.dto';
import { ExerciseService } from './exercise.service';
import { StatusEnum } from 'src/statuses/statuses.enum';
import { IWhere } from '../../../core/base.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream, writeFileSync } from 'fs';
import * as csv from 'csv-parser';
import * as request from 'request-promise';
import * as cheerio from 'cheerio';
import { CreateExerciseDto } from './dto/create.dto';
import { QuestionService } from '../question/question.service';
import { OptionService } from '../option/option.service';
import { Question } from '../question/entities/question.entity';
import { SubjectService } from 'src/modules/subject/subject.service';
import { GradeLevelService } from 'src/modules/grade-level/grade-level.service';

const relations = [
  {
    field: 'questions',
    entity: 'question',
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
@ApiTags('Exercise')
@Roles()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({
  path: 'exercise',
  version: '1',
})
export class ExerciseController {
  constructor(
    private readonly exerciseService: ExerciseService,
    private readonly questionService: QuestionService,
    private readonly optionService: OptionService,
    private readonly subjectService: SubjectService,
    private readonly gradeLevelService: GradeLevelService,
  ) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createExerciseDto: any): Promise<Exercise[]> {
    const questions = createExerciseDto?.questions?.map((item) => ({
      id: item,
    }));
    return this.exerciseService.create({
      ...createExerciseDto,
      questions,
    });
  }

  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @Post('/customs')
  @HttpCode(HttpStatus.CREATED)
  async createCustoms(
    @UploadedFile() file: Express.Multer.File,
    @Body() createExerciseDto: CreateExerciseDto | any,
    @Request() request: any,
  ): Promise<Exercise[] | null> {
    console.log(
      '🚀 ~ file: exercise.controller.ts:83 ~ ExerciseController ~ createExerciseDto:',
      createExerciseDto,
    );
    const author = request?.user?.id;
    if (file) {
      const fileName = file.originalname;

      writeFileSync(fileName, file.buffer, 'utf-8');
      const results: any[] = [];

      const data: Exercise[] = await new Promise((resolve, reject) => {
        createReadStream(fileName)
          .pipe(csv())
          .on('data', (data) => results.push(data))
          .on('end', async () => {
            const questions = results?.map((question: any) => {
              const optionIsCorrect = question?.isCorrect;
              const options: any[] = [];
              Object.entries(question).forEach(([key, value]) => {
                if (key?.includes('option')) {
                  options.push({
                    content: value,
                    isCorrect: key === optionIsCorrect,
                  });
                }
              });

              return {
                gradeLevelId: Number(createExerciseDto?.gradeLevelId),
                subjectId: Number(createExerciseDto?.subjectId),
                content: question?.content || question?.['content'],
                type: Number(question?.type),
                isPublish: Boolean(createExerciseDto.isPublish),
                author,
                score: parseFloat(question?.score) || 0,
                level: Number(question?.level),
                options,
              };
            });
            const questionsIds: number[] = [];
            questions.forEach(async ({ options, ...question }) => {
              const questionSave = (await this.questionService.create(
                question,
              )) as unknown as Question;
              const option = options?.map((option) => ({ ...option, question: questionSave?.id }));
              questionsIds?.push(questionSave?.id);
              await this.optionService.createMany(option);
            });

            const exercises = await this.exerciseService.create({
              name: createExerciseDto?.name,
              gradeLevel: Number(createExerciseDto?.gradeLevelId),
              subject: Number(createExerciseDto?.subjectId),
              isPublish: Boolean(createExerciseDto.isPublish),
              questions: questionsIds,
            });
            resolve(exercises);
          });
      });

      return data;
    }
    return null;
  }

  @Post('/crawl')
  @HttpCode(HttpStatus.CREATED)
  async crawlData(@Body() createExerciseDto: any): Promise<Exercise[] | null> {
    const [subject, gradeLevel] = await Promise.all([
      this.subjectService.findManyActive(),
      this.gradeLevelService.findManyActive(),
    ]);

    request('https://doctailieu.com/trac-nghiem/lop-6-l6452', (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html); // load HTML

        $('.content-left .section').each((index, el) => {
          if (index !== 0) return;
          const title = $(el).find('.title-cat').text();

          const subjectFind = subject?.find((item) =>
            title.toLocaleLowerCase()?.includes(item.nameVI.toLocaleLowerCase()),
          );

          const gradeLevelFind = gradeLevel?.find((item) =>
            title.toLocaleLowerCase()?.includes(item.nameVI.toLocaleLowerCase()),
          );
          if (!(title && subjectFind && gradeLevelFind)) return;

          const link = $(el).find('.section-content .more-all a').attr('href');

          request(link, (error, response, html) => {
            if (!error && response.statusCode == 200) {
              const $ = cheerio.load(html);
              $('.text-cauhoi').each((index, el) => {
                if (index !== 0) return;
                const link = $(el).find('a').attr('href');
                request(link, async (error, response, html) => {
                  if (!error && response.statusCode == 200) {
                    const $ = cheerio.load(html);
                    const titleEx = $('.the-article-header h1.the-article-title').text() || '';
                    const corrects: any[] = [];
                    $('.box-van-dap[data-tab] tbody tr:not(.bgf2)').each((index, el) => {
                      const tdList = el.children.filter((el) => $(el).text().trim());

                      corrects.push({
                        number: $(tdList?.[0]).text().trim(),
                        value: $(tdList?.[1]).text().trim(),
                      });
                      corrects.push({
                        number: $(tdList?.[2]).text().trim(),
                        value: $(tdList?.[3]).text().trim(),
                      });

                      // .find('td')
                      // .each((index, el) => {
                      //   console.log(`"${$(el).text()}"`);
                      // });
                      // const content = $(el).find('a span.underline').text();
                      // const options: any[] = [];
                    });
                    console.log(corrects);
                    return;
                    const questions: any[] = [];

                    // $('.box-van-dap.form-cauhoi').each((index, el) => {
                    //   const content = $(el).find('a span.underline').text();
                    //   const options: any[] = [];
                    //   $(el)
                    //     .find('.form-group')
                    //     .each((index, el) => {
                    //       const content = $(el).find('label-radio').text();
                    //       options.push({ content: content });
                    //     });
                    //   const question = {
                    //     gradeLevelId: Number(gradeLevelFind?.id),
                    //     subjectId: Number(subjectFind?.id),
                    //     content: content,
                    //     type: 1,
                    //     isPublish: true,
                    //     score: 0.25,
                    //     level: 1,
                    //     options,
                    //   };
                    //   questions.push(question);
                    // });
                    // const questionsIds: number[] = [];
                    // questions.forEach(async ({ options, ...question }) => {
                    //   const questionSave = (await this.questionService.create(
                    //     question,
                    //   )) as unknown as Question;
                    //   const option = options?.map((option) => ({
                    //     ...option,
                    //     question: questionSave?.id,
                    //   }));
                    //   questionsIds?.push(questionSave?.id);
                    //   await this.optionService.createMany(option);
                    // });

                    // const exercises = await this.exerciseService.create({
                    //   name: titleEx,
                    //   gradeLevel: Number(gradeLevelFind?.id),
                    //   subject: Number(subjectFind?.id),
                    //   isPublish: true,
                    //   questions: questionsIds,
                    // });
                    // resolve(exercises)
                    // console.log(exercises);
                  }
                });
              });
            }
          });
          // console.log(job);
        });
      }
    });

    return null;
    const questions = createExerciseDto?.questions?.map((item) => ({
      id: item,
    }));
    return this.exerciseService.create({
      ...createExerciseDto,
      questions,
    });

    return null;
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
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(1000), ParseIntPipe) limit: number,
    @Query('sortBy', new DefaultValuePipe('name')) sortBy: string,
    @Query('sortDirection', new DefaultValuePipe('ASC')) sortDirection: string,
    @Query('status', new DefaultValuePipe(0), ParseIntPipe) status: number,
    @Query('fieldSearch', new DefaultValuePipe('name')) fieldSearch: string | string[],
    @Query('searchName', new DefaultValuePipe('')) searchName: string,
    @Query('gradeLevel', new DefaultValuePipe(0)) gradeLevel: number,
    @Query('subject', new DefaultValuePipe(0)) subject: number,
  ): Promise<InfinityPaginationResultType<Exercise>> {
    if (limit > 50) {
      limit = 1000;
    }
    let where: IWhere[] = [];
    if (subject) {
      where = [...where, { field: 'subject', value: subject }];
    }
    if (gradeLevel) {
      where = [...where, { field: 'gradeLevelId', value: gradeLevel }];
    }
    return await this.exerciseService.findManyWithPagination({
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
  getActive(): Promise<Exercise[]> {
    return this.exerciseService.findManyActive(StatusEnum['active']);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<NullableType<Exercise>> {
    return this.exerciseService.findOne({ id: +id });
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: number,
    @Body() updateExerciseDto: UpdateExerciseDto,
  ): Promise<Exercise[]> {
    return this.exerciseService.update(id, updateExerciseDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number): Promise<void> {
    return this.exerciseService.softDelete(id);
  }
}
