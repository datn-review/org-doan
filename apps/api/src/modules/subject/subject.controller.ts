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
import { NullableType } from '../../utils/types/nullable.type';
import { Subject } from './entities/subject.entity';

import { CreateSubjectDto } from './dto/create.dto';
import { UpdateSubjectDto } from './dto/update.dto';
import { SubjectService } from './subject.service';
import { StatusEnum } from 'src/statuses/statuses.enum';

@ApiTags('Subject')
@Controller({
  path: 'subject',
  version: '1',
})
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}
  @ApiBearerAuth()
  @Roles(RoleEnum.WEB_ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createDto: CreateSubjectDto): Promise<Subject[]> {
    return this.subjectService.create({
      ...createDto,
    });
  }
  @ApiBearerAuth()
  @Roles(RoleEnum.WEB_ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
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
    @Query('sortBy', new DefaultValuePipe('nameVI')) sortBy: string,
    @Query('sortDirection', new DefaultValuePipe('ASC')) sortDirection: string,
    @Query('status', new DefaultValuePipe(0), ParseIntPipe) status: number,
    @Query('searchName', new DefaultValuePipe('')) searchName: string,
    @Query('fieldSearch', new DefaultValuePipe(['nameVI', 'nameEN']))
    fieldSearch: string | string[],
  ): Promise<InfinityPaginationResultType<Subject>> {
    if (limit > 50) {
      limit = 50;
    }

    return await this.subjectService.findManyWithPagination({
      page,
      limit,
      status,
      sortBy,
      sortDirection,
      searchName,
      fieldSearch,
    });
  }

  @Get('/active')
  @HttpCode(HttpStatus.OK)
  getActive(): Promise<Subject[]> {
    return this.subjectService.findManyActive(StatusEnum['active']);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<NullableType<Subject>> {
    return this.subjectService.findOne({ id: +id });
  }
  @ApiBearerAuth()
  @Roles(RoleEnum.WEB_ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: number, @Body() updateDto: UpdateSubjectDto): Promise<Subject[]> {
    return this.subjectService.update(id, updateDto);
  }
  @ApiBearerAuth()
  @Roles(RoleEnum.WEB_ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number): Promise<void> {
    return this.subjectService.softDelete(id);
  }
}
