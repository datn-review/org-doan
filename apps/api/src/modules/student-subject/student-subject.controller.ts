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
// import { NullableType } from '../../utils/types/nullable.type';
import { StudentSubject } from './entities/student-subject.entity';

import { CreateStudentSubjectDto } from './dto/create.dto';
import { UpdateStudentSubjectDto } from './dto/update.dto';
import { StudentSubjectService } from './student-subject.service';
import { StatusEnum } from 'src/statuses/statuses.enum';

@ApiBearerAuth()
@ApiTags('StudentSubject')
@Roles(RoleEnum.WEB_ADMIN)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({
  path: 'student-subject',
  version: '1',
})
export class StudentSubjectController {
  constructor(private readonly studentSubjectService: StudentSubjectService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createStudentSubjectDto: CreateStudentSubjectDto): Promise<StudentSubject[]> {
    return this.studentSubjectService.create({
      ...createStudentSubjectDto,
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
    @Query('sortBy', new DefaultValuePipe('createdAt')) sortBy: string,
    @Query('sortDirection', new DefaultValuePipe('ASC')) sortDirection: string,
    @Query('status', new DefaultValuePipe(0), ParseIntPipe) status: number,
    @Query('fieldSearch', new DefaultValuePipe('')) fieldSearch: string | string[],
    @Query('searchName', new DefaultValuePipe('')) searchName: string,
  ): Promise<InfinityPaginationResultType<StudentSubject>> {
    if (limit > 50) {
      limit = 1000;
    }

    return await this.studentSubjectService.findManyWithPagination({
      page,
      limit,
      status,
      sortBy,
      sortDirection,
      searchName,
      fieldSearch,
      relations: [
        { field: 'student', entity: 'user' },
        { field: 'subject', entity: 'subject' },
      ],
    });
  }

  @Get('/active')
  @HttpCode(HttpStatus.OK)
  getActive(): Promise<StudentSubject[]> {
    return this.studentSubjectService.findManyActive(StatusEnum['active']);
  }

  // @Get('/:id')
  // @HttpCode(HttpStatus.OK)
  // findOne(@Param('id') id: string): Promise<NullableType<StudentSubject>> {
  //   return this.studentSubjectService.findOne({ id: +id });
  // }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: number,
    @Body() updateStudentSubjectDto: UpdateStudentSubjectDto,
  ): Promise<StudentSubject[]> {
    return this.studentSubjectService.update(id, updateStudentSubjectDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number): Promise<void> {
    return this.studentSubjectService.softDelete(id);
  }
}