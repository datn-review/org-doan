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
import { InfinityPaginationResultType } from '../../../utils/types/infinity-pagination-result.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { Province } from './entities/province.entity';

import { CreateProvinceDto } from './dto/create.dto';
import { UpdateProvinceDto } from './dto/update.dto';
import { ProvinceService } from './province.service';
import { StatusEnum } from 'src/statuses/statuses.enum';

@ApiTags('Province')
@Controller({
  path: 'province',
  version: '1',
})
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProvinceDto: CreateProvinceDto): Promise<Province[]> {
    return this.provinceService.create({
      ...createProvinceDto,
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
    @Query('sortBy', new DefaultValuePipe('name')) sortBy: string,
    @Query('sortDirection', new DefaultValuePipe('ASC')) sortDirection: string,
    @Query('status', new DefaultValuePipe(0), ParseIntPipe) status: number,
    @Query('fieldSearch', new DefaultValuePipe('name')) fieldSearch: string | string[],
    @Query('searchName', new DefaultValuePipe('')) searchName: string,
  ): Promise<InfinityPaginationResultType<Province>> {
    if (limit > 50) {
      limit = 1000;
    }

    return await this.provinceService.findManyWithPagination({
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
  getActive(): Promise<Province[]> {
    return this.provinceService.findManyActive(StatusEnum['active']);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<NullableType<Province>> {
    return this.provinceService.findOne({ id: +id });
  }
  @ApiBearerAuth()
  @Roles(RoleEnum.WEB_ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: number,
    @Body() updateProvinceDto: UpdateProvinceDto,
  ): Promise<Province[]> {
    return this.provinceService.update(id, updateProvinceDto);
  }
  @ApiBearerAuth()
  @Roles(RoleEnum.WEB_ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number): Promise<void> {
    return this.provinceService.softDelete(id);
  }
}
