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
import { Lessons } from './entities/lessons.entity';

import { CreateLessonsDto } from './dto/create.dto';
import { UpdateLessonsDto } from './dto/update.dto';
import { LessonsService } from './lessons.service';
import { StatusEnum } from 'src/statuses/statuses.enum';
import * as moment from 'dayjs';
import { CollaborationService } from '../collaboration/collaboration.service';
import { ScheduleService } from '../schedule/schedule.service';
import { Schedule } from '../schedule/entities/schedule.entity';
import { isEmpty } from 'lodash';
interface ClassTime {
  day?: number;
  start?: string;
  end?: string;
}
const relation = [
  {
    field: 'assignments',
    entity: 'assignment',
  },
  {
    field: 'assignment.exercise',
    entity: 'exercise',
  },
];
const generateWeeklySchedule = ({
  startDate,
  endDate,
  classTimes,
  title,
  color,
  bgColor,
  collaboratorId,
}: {
  startDate: string;
  endDate: string;
  classTimes?: ClassTime[];
  title?: string;
  color: string;
  bgColor: string;
  collaboratorId: string;
}) => {
  if (!classTimes) return null;
  let currentDate = moment(startDate);

  const lastDate = moment(endDate);

  const schedule: any[] = [];
  while (currentDate.isSame(lastDate) || currentDate.isBefore(lastDate)) {
    const dayOfWeek = currentDate.day();

    classTimes?.forEach(({ start, day, end }) => {
      if (day === dayOfWeek) {
        schedule.push({
          // id: Math.floor(Math.random() * 200000),
          collaboration: collaboratorId,
          lessonStart: currentDate.format('YYYY-MM-DD') + ' ' + start,
          lessonEnd: currentDate.format('YYYY-MM-DD') + ' ' + end,
          // backgroundColor: bgColor,
          // borderColor: bgColor,
          // textColor: color,
        });
      }
    });
    currentDate = currentDate.add(1, 'days');
  }

  return schedule;
};
@ApiTags('Lessons')
@ApiBearerAuth()
@Roles()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({
  path: 'lessons',
  version: '1',
})
export class LessonsController {
  constructor(
    private readonly lessonsService: LessonsService,

    private collaborator: CollaborationService,
    private schedule: ScheduleService,
  ) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createLessonsDto: any): Promise<Lessons[]> {
    return this.lessonsService.create({
      ...createLessonsDto,
    });
  }
  @ApiBearerAuth()
  @Roles(RoleEnum.PESONAL_TUTOR)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('/default')
  @HttpCode(HttpStatus.CREATED)
  async createDefault(@Body() createLessonsDto: any): Promise<Lessons[] | null> {
    console.log('createLessonsDto', createLessonsDto);

    // const lessons = await
    // const lessons = await
    const [lessons, schedules] = await Promise.all([
      this.lessonsService.findMany({
        collaboration: createLessonsDto?.collaboratorId,
      }),
      this.schedule.findMany({
        collaboration: createLessonsDto?.collaboratorId,
      }),
    ]);

    const lessonsDelete = lessons?.map((item) => item.id);
    const schedulesDelete = schedules?.map((item) => item.id);

    const weeklySchedule: Lessons[] | null = generateWeeklySchedule({
      ...createLessonsDto,
    });
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.collaborator
      .update(createLessonsDto?.collaboratorId, {
        bgColor: createLessonsDto?.bgColor,
        textColor: createLessonsDto?.textColor,
        nameClass: createLessonsDto?.nameClass,
      })
      .then();

    if (createLessonsDto?.classTimes && weeklySchedule) {
      const classTimes: Schedule[] = createLessonsDto?.classTimes?.map(({ start, day, end }) => ({
        collaboration: createLessonsDto?.collaboratorId,
        dayOfWeek: day,
        timeStart: start,
        timeEnd: end,
      }));
      // eslint-disable-next-line @typescript-eslint/no-floating-promises

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [weeklyScheduleLessons, _, __, ___] = await Promise.all([
        !isEmpty(weeklySchedule) && this.lessonsService.createMany(weeklySchedule),
        !isEmpty(lessonsDelete) && this.lessonsService.delete(lessonsDelete),
        !isEmpty(schedulesDelete) && this.schedule.delete(schedulesDelete),
        !isEmpty(classTimes) && this.schedule.createMany(classTimes),
      ]);
      return weeklyScheduleLessons;
    }

    if (!weeklySchedule) return null;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [weeklyScheduleLessons, _, __] = await Promise.all([
      this.lessonsService.createMany(weeklySchedule),
      this.lessonsService.delete(lessonsDelete),
      this.schedule.delete(schedulesDelete),
    ]);
    return weeklyScheduleLessons;
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
    @Query('sortBy', new DefaultValuePipe('lessonTime')) sortBy: string,
    @Query('sortDirection', new DefaultValuePipe('ASC')) sortDirection: string,
    @Query('status', new DefaultValuePipe(0), ParseIntPipe) status: number,
    @Query('fieldSearch', new DefaultValuePipe('')) fieldSearch: string | string[],
    @Query('searchName', new DefaultValuePipe('')) searchName: string,
  ): Promise<InfinityPaginationResultType<Lessons>> {
    if (limit > 50) {
      limit = 1000;
    }

    return await this.lessonsService.findManyWithPagination({
      page,
      limit,
      status,
      sortBy,
      sortDirection,
      searchName,
      fieldSearch,
      relations: ['collaboration'],
    });
  }

  @Get('/active')
  @HttpCode(HttpStatus.OK)
  getActive(): Promise<Lessons[]> {
    return this.lessonsService.findManyActive(StatusEnum['active']);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<NullableType<Lessons>> {
    return this.lessonsService.findOne({ id: +id }, relation);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: number, @Body() updateLessonsDto: any): Promise<Lessons[]> {
    return this.lessonsService.update(id, updateLessonsDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number): Promise<void> {
    return this.lessonsService.softDelete(id);
  }
}
