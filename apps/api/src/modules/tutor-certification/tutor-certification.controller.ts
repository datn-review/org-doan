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
import { TutorCertification } from './entities/tutor-certification.entity';

import { CreateTutorCertificationDto } from './dto/create.dto';
import { UpdateTutorCertificationDto } from './dto/update.dto';
import { TutorCertificationService } from './tutor-certification.service';
import { StatusEnum } from 'src/statuses/statuses.enum';

@ApiBearerAuth()
@ApiTags('TutorCertification')
@Roles(RoleEnum.WEB_ADMIN)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({
  path: 'tutor-certification',
  version: '1',
})
export class TutorCertificationController {
  constructor(private readonly tutorCertificationService: TutorCertificationService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createTutorCertificationDto: CreateTutorCertificationDto,
  ): Promise<TutorCertification[]> {
    return this.tutorCertificationService.create({
      ...createTutorCertificationDto,
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
    @Query('fieldSearch', new DefaultValuePipe(['customerNameVN,customerNameVN']))
    fieldSearch: string | string[],
    @Query('searchName', new DefaultValuePipe('')) searchName: string,
  ): Promise<InfinityPaginationResultType<TutorCertification>> {
    if (limit > 50) {
      limit = 1000;
    }

    return await this.tutorCertificationService.findManyWithPagination({
      page,
      limit,
      status,
      sortBy,
      sortDirection,
      searchName,
      fieldSearch,
      relations: [
        { field: 'tutor', entity: 'user' },
        { field: 'certification', entity: 'certification' },
      ],
    });
  }

  @Get('/active')
  @HttpCode(HttpStatus.OK)
  getActive(): Promise<TutorCertification[]> {
    return this.tutorCertificationService.findManyActive(StatusEnum['active']);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<NullableType<TutorCertification>> {
    return this.tutorCertificationService.findOne({ id: +id });
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: number,
    @Body() updateTutorCertificationDto: UpdateTutorCertificationDto,
  ): Promise<TutorCertification[]> {
    return this.tutorCertificationService.update(id, updateTutorCertificationDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number): Promise<void> {
    return this.tutorCertificationService.softDelete(id);
  }
}
