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
import { GradeLevel } from './entities/grade-level.entity';

import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';
import { GradeLevelService } from './grade-level.service';
@ApiTags('Grade Level')
@Controller({
  path: 'grade-level',
  version: '1',
})
export class GradeLevelController {
  constructor(private readonly gradeLevelService: GradeLevelService) {}
  @ApiBearerAuth()
  @Roles(RoleEnum.WEB_ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProfileDto: CreateDto): Promise<GradeLevel[]> {
    return this.gradeLevelService.create({
      ...createProfileDto,
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
  ): Promise<InfinityPaginationResultType<GradeLevel>> {
    if (limit > 50) {
      limit = 50;
    }

    return await this.gradeLevelService.findManyWithPagination({
      page,
      limit,
      status,
      sortBy,
      sortDirection,
      searchName,
      fieldSearch: fieldSearch,
    });
  }

  @Get('/active')
  @HttpCode(HttpStatus.OK)
  async getActive(): Promise<GradeLevel[]> {
    const data = await this.gradeLevelService.findManyWithPagination({
      page: 1,
      status: 1,
      limit: 10000,
      sortBy: 'updatedAt',
      sortDirection: 'ASC',
      searchName: '',
      fieldSearch: 'nameVI',
    });
    return data?.data;
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<NullableType<GradeLevel>> {
    return this.gradeLevelService.findOne({ id: +id });
  }
  @ApiBearerAuth()
  @Roles(RoleEnum.WEB_ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: number, @Body() updateProfileDto: UpdateDto): Promise<GradeLevel[]> {
    return this.gradeLevelService.update(id, updateProfileDto);
  }
  @ApiBearerAuth()
  @Roles(RoleEnum.WEB_ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number): Promise<void> {
    return this.gradeLevelService.softDelete(id);
  }
}
