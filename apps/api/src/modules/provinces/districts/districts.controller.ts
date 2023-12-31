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
import { Districts } from './entities/districts.entity';

import { CreateDistrictsDto } from './dto/create.dto';
import { UpdateDistrictsDto } from './dto/update.dto';
import { DistrictsService } from './districts.service';
import { StatusEnum } from 'src/statuses/statuses.enum';

@ApiTags('Districts')
@Controller({
  path: 'districts',
  version: '1',
})
export class DistrictsController {
  constructor(private readonly districtsService: DistrictsService) {}
  @ApiBearerAuth()
  @Roles(RoleEnum.WEB_ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createDistrictsDto: CreateDistrictsDto): Promise<Districts[]> {
    return this.districtsService.create({
      ...createDistrictsDto,
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
  ): Promise<InfinityPaginationResultType<Districts>> {
    if (limit > 50) {
      limit = 1000;
    }

    return await this.districtsService.findManyWithPagination({
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
  getActive(@Query('id') id: number): Promise<Districts[]> {
    return this.districtsService.findManyDistrictActive(StatusEnum['active'], ['province'], id);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<NullableType<Districts>> {
    return this.districtsService.findOne({ id: +id });
  }
  @ApiBearerAuth()
  @Roles(RoleEnum.WEB_ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: number,
    @Body() updateDistrictsDto: UpdateDistrictsDto,
  ): Promise<Districts[]> {
    return this.districtsService.update(id, updateDistrictsDto);
  }
  @ApiBearerAuth()
  @Roles(RoleEnum.WEB_ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number): Promise<void> {
    return this.districtsService.softDelete(id);
  }
}
