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
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { RolesGuard } from 'src/roles/roles.guard';
import { InfinityPaginationResultType } from 'src/utils/types/infinity-pagination-result.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { Exercise } from './entities/exercise.entity';

import { UpdateExerciseDto } from './dto/update.dto';
import { ExerciseService } from './exercise.service';
import { StatusEnum } from 'src/statuses/statuses.enum';
import { IWhere } from '../../../core/base.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import csv from 'csv-parser';
import request from 'request-promise';
import * as cheerio from 'cheerio';

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
  constructor(private readonly exerciseService: ExerciseService) {}

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
    @Body() createExerciseDto: any,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Exercise[] | null> {
    if (file) {
      const results: any[] = [];
      createReadStream('data.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
          console.log(results);
        });
      return null;
      const questions = createExerciseDto?.questions?.map((item) => ({
        id: item,
      }));
      return this.exerciseService.create({
        ...createExerciseDto,
        questions,
      });
    }
    return null;
  }

  @Post('/crawl')
  @HttpCode(HttpStatus.CREATED)
  async crawlData(@Body() createExerciseDto: any): Promise<Exercise[] | null> {
    request('https://doctailieu.com/trac-nghiem/lop-6-l6452', (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html); // load HTML

        $('.content-left .section-content .more-all').each((index, el) => {
          const link = $(el).find('a').attr('href');

          request(link, (error, response, html) => {
            if (!error && response.statusCode == 200) {
              const $ = cheerio.load(html);

              $('.text-cauhoi').each((index, el) => {
                const link = $(el).find('a').attr('href');
                request(link, (error, response, html) => {
                  if (!error && response.statusCode == 200) {
                    const $ = cheerio.load(html);
                    const title = $('.the-article-header h1.the-article-title').text() || '';

                    const questions: any[] = [];

                    $('.box-van-dap form-cauhoi').each((index, el) => {
                      const content = $(el).find('a span.underline').text();
                      const options: any[] = [];
                      $(el)
                        .find('.form-group')
                        .each((index, el) => {
                          const content = $(el).find('label-radio').text();
                          options.push({ content: content });
                        });
                      const question = {
                        content,
                        type: 1,
                        level: 1,
                        score: 1,
                        gradeLevel: 1,
                        subject: 1,
                        options,
                      };
                      questions.push(question);
                    });
                    console.log('[title]', title);
                    console.log('[questions]', questions);
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
