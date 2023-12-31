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
import { InfinityPaginationResultType } from '../../utils/types/infinity-pagination-result.type';
import { TutorSubjectGrade } from './entities/tutor-subject-grade.entity';

import { StatusEnum } from 'src/statuses/statuses.enum';
import { CreateTutorSubjectGradeDto } from './dto/create.dto';
import { UpdateTutorSubjectGradeDto } from './dto/update.dto';
import { TutorSubjectGradeService } from './tutor-subject-grade.service';

@ApiBearerAuth()
@ApiTags('TutorSubjectGrade')
@Roles(RoleEnum.WEB_ADMIN)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({
  path: 'tutor-subject-grade',
  version: '1',
})
export class TutorSubjectGradeController {
  constructor(private readonly tutorSubjectGradeService: TutorSubjectGradeService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createTutorSubjectGradeDto: CreateTutorSubjectGradeDto,
  ): Promise<TutorSubjectGrade[]> {
    return this.tutorSubjectGradeService.create({
      ...createTutorSubjectGradeDto,
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
    @Query('sortBy', new DefaultValuePipe('createAt')) sortBy: string,
    @Query('sortDirection', new DefaultValuePipe('ASC')) sortDirection: string,
    @Query('status', new DefaultValuePipe(0), ParseIntPipe) status: number,
    @Query('fieldSearch', new DefaultValuePipe('')) fieldSearch: string | string[],
    @Query('searchName', new DefaultValuePipe('')) searchName: string,
  ): Promise<InfinityPaginationResultType<TutorSubjectGrade>> {
    if (limit > 50) {
      limit = 1000;
    }

    return await this.tutorSubjectGradeService.findManyWithPagination({
      page,
      limit,
      status,
      sortBy,
      sortDirection,
      searchName,
      fieldSearch,
      relations: [
        { field: 'tutor', entity: 'user' },
        { field: 'subject', entity: 'subject' },
        { field: 'grade', entity: 'gradeLevel' },
      ],
    });
  }

  @Get('/active')
  @HttpCode(HttpStatus.OK)
  getActive(): Promise<TutorSubjectGrade[]> {
    return this.tutorSubjectGradeService.findManyActive(StatusEnum['active']);
  }

  // @Get('/:id')
  // @HttpCode(HttpStatus.OK)
  // findOne(@Param('id') id: string): Promise<NullableType<TutorSubjectGrade>> {
  //   return this.tutorSubjectGradeService.findOne({ id: +id });
  // }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: number,
    @Body() updateTutorSubjectGradeDto: UpdateTutorSubjectGradeDto,
  ): Promise<TutorSubjectGrade[]> {
    return this.tutorSubjectGradeService.update(id, updateTutorSubjectGradeDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number): Promise<void> {
    return this.tutorSubjectGradeService.softDelete(id);
  }
}
