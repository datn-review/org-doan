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
import { TutorSkills } from './entities/tutor-skills.entity';

import { CreateTutorSkillsDto } from './dto/create.dto';
import { UpdateTutorSkillsDto } from './dto/update.dto';
import { TutorSkillsService } from './tutor-skills.service';
import { StatusEnum } from 'src/statuses/statuses.enum';

@ApiBearerAuth()
@ApiTags('TutorSkills')
@Roles(RoleEnum.WEB_ADMIN)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({
  path: 'tutor-skills',
  version: '1',
})
export class TutorSkillsController {
  constructor(private readonly tutorSkillsService: TutorSkillsService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTutorSkillsDto: CreateTutorSkillsDto): Promise<TutorSkills[]> {
    return this.tutorSkillsService.create({
      ...createTutorSkillsDto,
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
    @Query('fieldSearch', new DefaultValuePipe(['customerNameVN', 'customerNameEN']))
    fieldSearch: string | string[],
    @Query('searchName', new DefaultValuePipe('')) searchName: string,
  ): Promise<InfinityPaginationResultType<TutorSkills>> {
    if (limit > 50) {
      limit = 1000;
    }

    return await this.tutorSkillsService.findManyWithPagination({
      page,
      limit,
      status,
      sortBy,
      sortDirection,
      searchName,
      fieldSearch,
      relations: [
        { field: 'tutor', entity: 'user' },
        { field: 'skills', entity: 'skills' },
      ],
    });
  }

  @Get('/active')
  @HttpCode(HttpStatus.OK)
  getActive(): Promise<TutorSkills[]> {
    return this.tutorSkillsService.findManyActive(StatusEnum['active']);
  }

  // @Get('/:id')
  // @HttpCode(HttpStatus.OK)
  // findOne(@Param('id') id: string): Promise<NullableType<TutorSkills>> {
  //   return this.tutorSkillsService.findOne({ id: +id });
  // }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: number,
    @Body() updateTutorSkillsDto: UpdateTutorSkillsDto,
  ): Promise<TutorSkills[]> {
    return this.tutorSkillsService.update(id, updateTutorSkillsDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number): Promise<void> {
    return this.tutorSkillsService.softDelete(id);
  }
}
