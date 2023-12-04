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
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { RolesGuard } from 'src/roles/roles.guard';
import { InfinityPaginationResultType } from 'src/utils/types/infinity-pagination-result.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { Exercise } from './entities/exercise.entity';

import { CreateExerciseDto } from './dto/create.dto';
import { UpdateExerciseDto } from './dto/update.dto';
import { ExerciseService } from './exercise.service';
import { StatusEnum } from 'src/statuses/statuses.enum';
import { IWhere } from '../../../core/base.service';

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
