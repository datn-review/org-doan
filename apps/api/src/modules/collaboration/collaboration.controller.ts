import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  forwardRef,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { InfinityPaginationResultType } from '../../utils/types/infinity-pagination-result.type';
import { NullableType } from '../../utils/types/nullable.type';
import { Collaboration } from './entities/collaboration.entity';

import { StatusEnum } from 'src/statuses/statuses.enum';
import { CollaborationService } from './collaboration.service';
import { CreateCollaborationDto } from './dto/create.dto';
import { UpdateCollaborationDto } from './dto/update.dto';
import { RoleEnum } from 'src/roles/roles.enum';
import { IsEmpty } from 'class-validator';
import { PaymentService } from '../payment/payment.service';
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
const relations = [
  { field: 'posts', entity: 'posts' },
  { field: 'posts.subjects', entity: 'subject' },

  { field: 'posts.gradeLevels', entity: 'grade' },
  { field: 'posts.user', entity: 'userPost' },
  {
    field: 'user',
    entity: 'user',
  },

  {
    field: 'payment',
    entity: 'payment',
  },
  {
    field: 'lessons',
    entity: 'lesson',
  },
  {
    field: 'schedules',
    entity: 'schedule',
  },
];
const relationsPay = [
  { field: 'posts', entity: 'posts' },

  {
    field: 'posts.user',
    entity: 'user',
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
    @Inject(forwardRef(() => PaymentService))
    private paymentService: PaymentService,
  ) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Request() request,
    @Body() createCollaborationDto: CreateCollaborationDto,
  ): Promise<Collaboration[]> {
    const user = request.user.id || 0;
    // const role = request?.user?.role?.id || 0;
    //
    // let student: any = 0;
    // let tutor: any = 0;
    //
    // if (role === RoleEnum.STUDENT) {
    //   student = userId;
    //   tutor = createCollaborationDto?.user || 0;
    // }
    // if (role === RoleEnum.PESONAL_TUTOR) {
    //   tutor = userId;
    //   student = createCollaborationDto?.user || 0;
    // }

    return this.collaborationService.create({
      ...createCollaborationDto,
      user,
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

  @Get('/classes')
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'searchName', required: false })
  @ApiQuery({ name: 'sortBy', required: false })
  @ApiQuery({ name: 'sortDirection', required: false })
  @ApiQuery({ name: 'sortBy', required: false })
  @ApiQuery({ name: 'fieldSearch', required: false })
  async findAllClass(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(1000), ParseIntPipe) limit: number,
    @Query('sortBy', new DefaultValuePipe('createdAt')) sortBy: string,
    @Query('sortDirection', new DefaultValuePipe('ASC')) sortDirection: string,
    @Query('fieldSearch', new DefaultValuePipe('')) fieldSearch: string | string[],
    @Query('searchName', new DefaultValuePipe('')) searchName: string,
    @Request() req: any,
  ): Promise<InfinityPaginationResultType<Collaboration>> {
    if (limit > 50) {
      limit = 1000;
    }

    const status = 5;
    const userId = req?.user?.id;
    console.log(userId);

    return await this.collaborationService.findManyWithPagination({
      page,
      limit,
      status,
      sortBy,
      sortDirection,
      searchName,
      fieldSearch,
      relations,
      or: [
        [
          {
            field: 'status',
            value: 4,
          },
          {
            field: 'status',
            value: 5,
          },
        ],
        [
          {
            field: 'userId',
            value: userId,
          },
          {
            field: 'posts.userId',
            value: userId,
          },
        ],
      ],
    });
  }

  @Get('/active')
  @HttpCode(HttpStatus.OK)
  getActive(): Promise<Collaboration[]> {
    return this.collaborationService.findManyActive(StatusEnum['active']);
  }
  @Get('/request')
  @HttpCode(HttpStatus.OK)
  async request(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(1000), ParseIntPipe) limit: number,
    @Query('sortBy', new DefaultValuePipe('createdAt')) sortBy: string,
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
  @Put('/poster-confirm/:id')
  @HttpCode(HttpStatus.OK)
  async posterConfirm(
    @Request() request,
    @Body() createCollaborationDto: UpdateCollaborationDto,
    @Param('id') id: string,
  ): Promise<Collaboration[] | null> {
    const role = request?.user?.role?.id || 0;

    const status = 3;

    let data = {};

    if (role === RoleEnum.STUDENT) {
      const studentSignature = createCollaborationDto.signature;
      data = {
        studentSignature,
        status,
      };
    }
    if (role === RoleEnum.PESONAL_TUTOR) {
      const tutorSignature = createCollaborationDto.signature;
      data = {
        tutorSignature,
        status,
      };
    }
    // if (IsEmpty(data)) return null;

    return this.collaborationService.update(+id, {
      ...data,
      contractEndDate: createCollaborationDto?.contractEndDate,
      contractStartDate: createCollaborationDto?.contractStartDate,
      contractTerms: createCollaborationDto?.contractTerms,
    });
  }

  @Put('/register-confirm/:id')
  @HttpCode(HttpStatus.OK)
  async registerConfirm(
    @Request() request,
    @Body() createCollaborationDto: UpdateCollaborationDto,
    @Param('id') id: string,
  ): Promise<Collaboration[] | null> {
    const role = request?.user?.role?.id || 0;

    const status = 4;

    let data = {};

    if (role === RoleEnum.STUDENT) {
      const studentSignature = createCollaborationDto.signature;
      data = {
        studentSignature,
        status,
      };
    }
    if (role === RoleEnum.PESONAL_TUTOR) {
      const tutorSignature = createCollaborationDto.signature;
      data = {
        tutorSignature,
        status,
      };
    }

    const deadPaymentDate = new Date();
    deadPaymentDate.setDate(deadPaymentDate.getDate() + 7);

    const collaboration = await this.collaborationService.findOne(
      {
        id: +id,
      },
      relationsPay,
    );
    if (collaboration) {
      const sender = collaboration?.posts?.user?.id || 0;
      console.log(collaboration?.posts);
      let amountX = 1;

      if (collaboration?.posts?.perTime == 2) {
        amountX = 4;
      } else {
        amountX = 4 * Number(collaboration?.posts?.dayWeek);
      }
      const amount = Number(collaboration?.posts?.fee) * amountX;

      await this.paymentService.create({
        collaboration: +id,
        sender,
        amount,
        deadPaymentDate,
      });
    }

    return this.collaborationService.update(+id, {
      ...data,
    });
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<NullableType<Collaboration>> {
    return this.collaborationService.findOne({ id: +id }, relations);
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
