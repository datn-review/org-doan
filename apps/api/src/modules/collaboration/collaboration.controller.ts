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
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
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
import { PaymentService } from '../payment/payment.service';
import * as dayjs from 'dayjs';
import { PostsService } from '../posts/posts.service';

function calculateDaysInMonthRange(
  contractStartDate: string,
  contractEndDate: string,
): Record<string, number> {
  const start = dayjs(contractStartDate);
  const end = dayjs(contractEndDate);

  const daysInEachMonth: Record<string, number> = {};

  let currentMonth = start;

  while (currentMonth.isSame(end) || currentMonth.isBefore(end)) {
    const monthKey = currentMonth.format('YYYY-MM');
    // console.log(
    //   currentMonth.format('DD-MM-YYYY'),
    //   currentMonth.endOf('month').format('DD-MM-YYYY'),
    // );
    let endDay = currentMonth.endOf('month');
    if (currentMonth.endOf('month').isAfter(end)) {
      endDay = end;
    }

    const daysInMonth = endDay.diff(currentMonth, 'day') + 1; // Thay đổi ở đ
    // ây

    daysInEachMonth[monthKey] = Math.min(
      currentMonth.endOf('month').diff(currentMonth, 'day') + 1,
      daysInMonth,
    );
    currentMonth = currentMonth.startOf('month').add(1, 'month');
  }

  return daysInEachMonth;
}

const relations = [
  { field: 'posts', entity: 'posts' },
  { field: 'posts.subjects', entity: 'subject' },

  { field: 'posts.gradeLevels', entity: 'grade' },
  { field: 'posts.certifications', entity: 'certification' },
  { field: 'posts.skills', entity: 'skill' },
  { entity: 'wards', field: 'posts.wards' },
  { entity: 'districts', field: 'wards.districts' },
  { entity: 'province', field: 'districts.province' },
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
    field: 'payment.sender',
    entity: 'senderPayment',
  },
  {
    field: 'payment.receiver',
    entity: 'receiverPayment',
  },
  {
    field: 'lessons',
    entity: 'lesson',
  },
  {
    field: 'feedback',
    entity: 'feedback',
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
  {
    field: 'user',
    entity: 'user_',
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
    @Inject(forwardRef(() => PostsService))
    private readonly postsService: PostsService,

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
    @Request() req: any,
  ): Promise<InfinityPaginationResultType<Collaboration>> {
    if (limit > 50) {
      limit = 1000;
    }
    const userId = req?.user?.id;
    return await this.collaborationService.findManyWithPagination({
      page,
      limit,
      status,
      sortBy,
      sortDirection,
      searchName,
      fieldSearch,
      relations,
      where: [
        {
          field: 'userId',
          value: userId,
        },
      ],
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

    if (role === RoleEnum.STUDENT || RoleEnum.PARENT) {
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
    const collaborationGet = await this.collaborationService.findOne(
      {
        id: +id,
      },
      relationsPay,
    );
    if (collaborationGet) {
      const postsID = collaborationGet?.posts?.id || 0;

      void this.postsService.update(+postsID, {
        status: 2,
      });
    }

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

    if (role === RoleEnum.STUDENT || RoleEnum.PARENT) {
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

    const collaboration = await this.collaborationService.findOne(
      {
        id: +id,
      },
      relationsPay,
    );
    if (collaboration) {
      const sender = collaboration?.posts?.user?.id || 0;
      const receiver = collaboration?.user?.id || 0;
      const daysInMonth = calculateDaysInMonthRange(
        dayjs(collaboration?.contractStartDate).format('YYYY-MM-DD'),
        dayjs(collaboration?.contractEndDate).format('YYYY-MM-DD'),
      );

      const payment: any[] = [];
      let dayRemainder = 0;
      const daysInMonthArray = Object.entries(daysInMonth);
      daysInMonthArray?.forEach(([key, value], index) => {
        const dayInMonth = dayRemainder + value;
        let feeMonthDate = dayjs(key, 'YYYY-MM');
        feeMonthDate = feeMonthDate.add(1, 'day');

        let deadPaymentDate: any = feeMonthDate.add(7, 'day');
        if (index === 0) {
          deadPaymentDate = new Date();
          deadPaymentDate.setDate(deadPaymentDate.getDate() + 7);
        }
        let weeks = Math.floor(dayInMonth / 7);
        const weeksRemainder = dayInMonth % 7;

        if (weeksRemainder) {
          weeks = weeks + 1;

          if (index === daysInMonthArray.length - 1) {
            if (weeksRemainder < 3) {
              weeks = weeks - 1;
            }
          }

          dayRemainder = 7 - weeksRemainder;
        } else {
          dayRemainder = 0;
        }

        let amountX = 1;
        let amount = 0;
        if (collaboration?.posts?.perTime == 1) {
          const amountForDay = collaboration?.posts?.fee / feeMonthDate.daysInMonth();
          amount = amountForDay * dayInMonth;
        }

        if (collaboration?.posts?.perTime == 2) {
          amountX = weeks;
          amount = Number(collaboration?.posts?.fee) * amountX;
        }
        if (collaboration?.posts?.perTime === 3) {
          amountX = weeks * Number(collaboration?.posts?.dayWeek);
          amount = Number(collaboration?.posts?.fee) * amountX;
        }
        const amountTutor = amount - amount * 0.1;

        payment.push({
          collaboration: +id,
          sender,
          amount,
          deadPaymentDate,
          feeMonthDate,
        });
        payment.push({
          collaboration: +id,
          receiver,
          amount: amountTutor,
          feeMonthDate,
        });
      });
      await this.paymentService.createMany(payment);

      // await this.paymentService.create({
      //   collaboration: +id,
      //   sender,
      //   amount,
      //   deadPaymentDate,
      // });
    }

    return this.collaborationService.update(+id, {
      ...data,
    });
    // return null;
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
