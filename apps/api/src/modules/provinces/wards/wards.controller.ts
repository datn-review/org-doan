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
import { Wards } from './entities/wards.entity';

import { CreateWardsDto } from './dto/create.dto';
import { UpdateWardsDto } from './dto/update.dto';
import { WardsService } from './wards.service';
import { StatusEnum } from 'src/statuses/statuses.enum';

@ApiTags('Wards')
@Controller({
  path: 'wards',
  version: '1',
})
export class WardsController {
  constructor(private readonly wardsService: WardsService) {}
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth()
  @Roles(RoleEnum.WEB_ADMIN)
  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createWardsDto: CreateWardsDto): Promise<Wards[]> {
    return this.wardsService.create({
      ...createWardsDto,
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
    @Query('sortBy', new DefaultValuePipe('name')) sortBy: string,
    @Query('sortDirection', new DefaultValuePipe('ASC')) sortDirection: string,
    @Query('status', new DefaultValuePipe(0), ParseIntPipe) status: number,
    @Query('fieldSearch', new DefaultValuePipe('name')) fieldSearch: string | string[],
    @Query('searchName', new DefaultValuePipe('')) searchName: string,
  ): Promise<InfinityPaginationResultType<Wards>> {
    if (limit > 50) {
      limit = 1000;
    }

    return await this.wardsService.findManyWithPagination({
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
  getActive(@Query('id') id: number): Promise<Wards[]> {
    return this.wardsService.findManyActive(StatusEnum['active'], ['districts'], id);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<NullableType<Wards>> {
    return this.wardsService.findOne({ id: +id });
  }
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth()
  @Roles(RoleEnum.WEB_ADMIN)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: number, @Body() updateWardsDto: UpdateWardsDto): Promise<Wards[]> {
    return this.wardsService.update(id, updateWardsDto);
  }
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth()
  @Roles(RoleEnum.WEB_ADMIN)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number): Promise<void> {
    return this.wardsService.softDelete(id);
  }
}
