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
import { Certifications } from './entities/certifications.entity';

import { CreateCertificationsDto } from './dto/create.dto';
import { UpdateCertificationsDto } from './dto/update.dto';
import { CertificationsService } from './certifications.service';
import { StatusEnum } from 'src/statuses/statuses.enum';

@ApiTags('certifications')
@Controller({
  path: 'certifications',
  version: '1',
})
export class CertificationsController {
  constructor(private readonly certificationsService: CertificationsService) {}
  @ApiBearerAuth()
  @Roles(RoleEnum.WEB_ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCertificationsDto: CreateCertificationsDto): Promise<Certifications[]> {
    return this.certificationsService.create({
      ...createCertificationsDto,
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
    @Query('fieldSearch', new DefaultValuePipe(['nameEN', 'nameVI']))
    fieldSearch: string | string[],
    @Query('searchName', new DefaultValuePipe('')) searchName: string,
  ): Promise<InfinityPaginationResultType<Certifications>> {
    if (limit > 50) {
      limit = 1000;
    }
    console.log(sortBy);
    return await this.certificationsService.findManyWithPagination({
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
  getActive(): Promise<Certifications[]> {
    return this.certificationsService.findManyActive(StatusEnum['active']);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<NullableType<Certifications>> {
    return this.certificationsService.findOne({ id: +id });
  }
  @ApiBearerAuth()
  @Roles(RoleEnum.WEB_ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: number,
    @Body() updateCertificationsDto: UpdateCertificationsDto,
  ): Promise<Certifications[]> {
    return this.certificationsService.update(id, updateCertificationsDto);
  }
  @ApiBearerAuth()
  @Roles(RoleEnum.WEB_ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number): Promise<void> {
    return this.certificationsService.softDelete(id);
  }
}
