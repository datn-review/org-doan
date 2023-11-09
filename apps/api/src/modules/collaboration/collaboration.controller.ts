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
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { InfinityPaginationResultType } from '../../utils/types/infinity-pagination-result.type';
import { NullableType } from '../../utils/types/nullable.type';
import { Collaboration } from './entities/collaboration.entity';

import { StatusEnum } from 'src/statuses/statuses.enum';
import { RegistrationService } from '../registration/registration.service';
import { CollaborationService } from './collaboration.service';
import { CreateCollaborationDto } from './dto/create.dto';
import { UpdateCollaborationDto } from './dto/update.dto';
import { RoleEnum } from 'src/roles/roles.enum';
const relations = [
  { field: 'posts', entity: 'posts' },
  { field: 'posts.subjects', entity: 'subject' },

  { field: 'posts.gradeLevels', entity: 'grade' },
  { field: 'posts.user', entity: 'user' },
  {
    field: 'tutor',
    entity: 'tutor',
  },
  {
    field: 'student',
    entity: 'student',
  },
];

@ApiBearerAuth()
@ApiTags('Collaboration')
@Roles()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({
  path: 'collaboration',
  version: '1',
})
export class CollaborationController {
  constructor(
    private readonly collaborationService: CollaborationService,
    private registrationService: RegistrationService,
  ) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Request() request,
    @Body() createCollaborationDto: CreateCollaborationDto,
  ): Promise<Collaboration[]> {
    const userId = request.user.id || 0;
    const role = request?.user?.role?.id || 0;

    let student: any = 0;
    let tutor: any = 0;

    if (role === RoleEnum.STUDENT) {
      student = userId;
      tutor = createCollaborationDto?.user || 0;
    }
    if (role === RoleEnum.PESONAL_TUTOR) {
      tutor = userId;
      student = createCollaborationDto?.user || 0;
    }

    return this.collaborationService.create({
      ...createCollaborationDto,
      student,
      tutor,
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
    @Query('sortBy', new DefaultValuePipe('startDate')) sortBy: string,
    @Query('sortDirection', new DefaultValuePipe('ASC')) sortDirection: string,
    @Query('status', new DefaultValuePipe(0), ParseIntPipe) status: number,
    @Query('fieldSearch', new DefaultValuePipe('')) fieldSearch: string | string[],
    @Query('searchName', new DefaultValuePipe('')) searchName: string,
  ): Promise<InfinityPaginationResultType<Collaboration>> {
    if (limit > 50) {
      limit = 1000;
    }

    return await this.collaborationService.findManyWithPagination({
      page,
      limit,
      status,
      sortBy,
      sortDirection,
      searchName,
      fieldSearch,
      relations,
    });
  }

  @Get('/active')
  @HttpCode(HttpStatus.OK)
  getActive(): Promise<Collaboration[]> {
    return this.collaborationService.findManyActive(StatusEnum['active']);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<NullableType<Collaboration>> {
    return this.collaborationService.findOne({ id: +id });
  }

  @Get('/request-list')
  @HttpCode(HttpStatus.OK)
  async register(@Request() request): Promise<Collaboration[] | null> {
    return this.collaborationService.findMany({ userId: request.user.id }, relations);
  }

  @Get('/post/:id')
  @HttpCode(HttpStatus.OK)
  async post(@Param('id') id: string): Promise<Collaboration[] | null> {
    return this.collaborationService.findMany({ postsId: id }, relations);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: number,
    @Body() updateCollaborationDto: UpdateCollaborationDto,
  ): Promise<Collaboration[]> {
    return this.collaborationService.update(id, updateCollaborationDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number): Promise<void> {
    return this.collaborationService.softDelete(id);
  }
}
