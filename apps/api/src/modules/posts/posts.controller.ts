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
import { RolesGuard } from 'src/roles/roles.guard';
import { InfinityPaginationResultType } from '../../utils/types/infinity-pagination-result.type';
import { NullableType } from '../../utils/types/nullable.type';
import { Posts } from './entities/posts.entity';

import { CreatePostsDto } from './dto/create.dto';
import { UpdatePostsDto } from './dto/update.dto';
import { PostTimeAvailabilityService } from './post-time-availability/post-time-availability.service';
import { PostsService } from './posts.service';
import { Roles } from 'src/roles/roles.decorator';
import { differenceWith, isEmpty } from 'lodash';

@ApiTags('Posts')
@Controller({
  path: 'posts',
  version: '1',
})
export class PostsController {
  constructor(
    private readonly postsService: PostsService,

    private readonly postTimeAvailabilityService: PostTimeAvailabilityService,
  ) {}

  @ApiBearerAuth()
  @Roles()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('/my')
  @HttpCode(HttpStatus.OK)
  async mePost(@Request() request): Promise<NullableType<Posts[] | null>> {
    const userId = request.user.id;

    return this.postsService.findMany({ userId: Number(userId) }, [
      { entity: 'skill', field: 'skills' },
      { entity: 'gradeLevel', field: 'gradeLevels' },
      { entity: 'certification', field: 'certifications' },
      { entity: 'subject', field: 'subjects' },
      { entity: 'post_time_availability', field: 'postTimeAvailability' },
      { entity: 'wards', field: 'wards' },
      { entity: 'user', field: 'user' },
      { entity: 'photo', field: 'user.photo' },
      { entity: 'districts', field: 'wards.districts' },
      { entity: 'province', field: 'districts.province' },
    ]);
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @Roles()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async create(@Request() request, @Body() createPostsDto: CreatePostsDto): Promise<Posts[]> {
    const skills = createPostsDto?.skills?.map((item) => ({
      id: item,
    }));

    const certifications = createPostsDto?.certification?.map((item) => ({
      id: item,
    }));
    const gradeLevels =
      createPostsDto?.gradeLevel.length > 0
        ? createPostsDto?.gradeLevel?.map((item) => ({
            id: item,
          }))
        : [{ id: createPostsDto.gradeLevel }];

    const subjects = createPostsDto?.subject?.map((item) => ({
      id: item,
    }));
    const postPayLoad = {
      address: createPostsDto?.address,
      dayWeek: createPostsDto?.dayWeek,

      fee: createPostsDto?.fee,

      timeDay: createPostsDto?.timeDay,
      perTime: createPostsDto?.perTime,
      requestDetailVI: createPostsDto?.requestDetailVI,
      requestSummaryVI: createPostsDto?.requestSummaryVI,

      timeStart: createPostsDto?.timeStart,
      type: createPostsDto?.type,
      wards: createPostsDto?.wards,
      user: request.user.id,
      skills,

      certifications,
      gradeLevels,
      subjects,
    };

    const post = await this.postsService.create({ ...postPayLoad });
    const postsId = (post as unknown as Posts)?.id;
    // const certifications = createPostsDto?.certification?.map((item) => ({
    //   certificationsId: item,
    //   postsId,
    // }));
    // const gradeLevel = createPostsDto?.gradeLevel?.map((item) => ({
    //   gradeLevelId: item,
    //   postsId,
    // }));

    // const skills = createPostsDto?.skills?.map((item) => ({
    //   skillsId: item,
    //   postsId,
    // }));

    // const subject = createPostsDto?.subject?.map((item) => ({
    //   subjectId: item,
    //   postsId,
    // }));
    const timeAvailability = createPostsDto.timeAvailability?.map((item) => {
      const [dayofWeek, hour] = item?.split('__');

      return { dayofWeekId: Number(dayofWeek), hourId: Number(hour), postsId };
    });

    try {
      // void this.postGradeService.createMany(gradeLevel);
      // void this.postSkillsService.createMany(skills);
      // void this.postSubjectService.createMany(subject);

      // void this.postCertificationService.createMany(certifications);
      void this.postTimeAvailabilityService.createMany(timeAvailability);
    } catch (err) {
      console.log(err);
    }

    return post;
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
  ): Promise<InfinityPaginationResultType<Posts>> {
    if (limit > 50) {
      limit = 1000;
    }

    return await this.postsService.findManyWithPagination({
      page,
      limit,
      status,
      sortBy,
      sortDirection,
      searchName,
      fieldSearch,
      relations: [
        { entity: 'skill', field: 'skills' },
        { entity: 'gradeLevel', field: 'gradeLevels' },
        { entity: 'certification', field: 'certifications' },
        { entity: 'subject', field: 'subjects' },
        { entity: 'post_time_availability', field: 'postTimeAvailability' },
        { entity: 'wards', field: 'wards' },
        { entity: 'districts', field: 'wards.districts' },
        { entity: 'province', field: 'districts.province' },
        { entity: 'user', field: 'user' },
        { entity: 'collaboration', field: 'collaboration' },
        { entity: 'user__', field: 'collaboration.user' },
      ],
    });
  }

  @Get('/active/')
  @HttpCode(HttpStatus.OK)
  async getActive(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(1000), ParseIntPipe) limit: number,
    @Query('sortBy', new DefaultValuePipe('createdAt')) sortBy: string,
    @Query('sortDirection', new DefaultValuePipe('ASC')) sortDirection: string,
    @Query('certification', new DefaultValuePipe(0)) certification?: number,
    @Query('skills', new DefaultValuePipe(0)) skills?: number,
    @Query('grade', new DefaultValuePipe(0)) grade?: number,
    @Query('subject', new DefaultValuePipe(0)) subject?: number,
    @Query('status', new DefaultValuePipe(0), ParseIntPipe) status?: number,
  ): Promise<{ data: any[]; totals: number }> {
    const where: any = [];

    if (certification) {
      where.push({ field: 'certification.id', value: certification });
    }
    if (skills) {
      where.push({ field: 'skill.id', value: skills });
    }
    if (grade) {
      where.push({ field: 'gradeLevel.id', value: grade });
    }
    if (subject) {
      where.push({ field: 'subject.id', value: subject });
    }
    // if (status) {
    //   where.push({ field: 'status', value: status });
    // }
    const data = await this.postsService.findManyWithPagination({
      page,
      limit,
      status,
      sortBy,
      sortDirection,
      searchName: '',
      fieldSearch: '',
      relations: [
        { entity: 'skill', field: 'skills' },
        { entity: 'gradeLevel', field: 'gradeLevels' },
        { entity: 'certification', field: 'certifications' },
        { entity: 'subject', field: 'subjects' },
        { entity: 'post_time_availability', field: 'postTimeAvailability' },
        { entity: 'wards', field: 'wards' },
        { entity: 'districts', field: 'wards.districts' },
        { entity: 'province', field: 'districts.province' },
        { entity: 'user', field: 'user' },
        { entity: 'collaboration', field: 'collaboration' },
        { entity: 'user__', field: 'collaboration.user' },
      ],
      where,
    });
    const dataMap = data?.data.map((item) => {
      const isExistTutor = item?.collaboration?.some((item) => item?.status === 3);
      const isUserRegistered = false;

      return { ...item, collaboration: null, isExistTutor, isUserRegistered };
    });
    return { data: dataMap, totals: data?.totals };
  }
  @Roles()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('/active/auth')
  @HttpCode(HttpStatus.OK)
  async getActiveAuth(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(1000), ParseIntPipe) limit: number,
    @Query('sortBy', new DefaultValuePipe('createdAt')) sortBy: string,
    @Query('sortDirection', new DefaultValuePipe('ASC')) sortDirection: string,
    @Query('status', new DefaultValuePipe(0), ParseIntPipe) status: number,
    @Query('certification', new DefaultValuePipe(0)) certification?: number,
    @Query('skills', new DefaultValuePipe(0)) skills?: number,
    @Query('grade', new DefaultValuePipe(0)) grade?: number,
    @Query('subject', new DefaultValuePipe(0)) subject?: number,
    @Request() request?: any,
  ): Promise<{ data: any[]; totals: number }> {
    const userId = request?.user?.id;
    const where: any = [];

    if (certification) {
      where.push({ field: 'certification.id', value: certification });
    }
    if (skills) {
      where.push({ field: 'skill.id', value: skills });
    }
    if (grade) {
      where.push({ field: 'gradeLevel.id', value: grade });
    }
    if (subject) {
      where.push({ field: 'subject.id', value: subject });
    }
    // if (status) {
    //   where.push({ field: 'status', value: status });
    // }
    const data = await this.postsService.findManyWithPagination({
      page,
      limit,
      status,
      sortBy,
      sortDirection,
      searchName: '',
      fieldSearch: '',
      relations: [
        { entity: 'skill', field: 'skills' },
        { entity: 'gradeLevel', field: 'gradeLevels' },
        { entity: 'certification', field: 'certifications' },
        { entity: 'subject', field: 'subjects' },
        { entity: 'post_time_availability', field: 'postTimeAvailability' },
        { entity: 'wards', field: 'wards' },
        { entity: 'districts', field: 'wards.districts' },
        { entity: 'province', field: 'districts.province' },
        { entity: 'user', field: 'user' },
        { entity: 'collaboration', field: 'collaboration' },
        { entity: 'user__', field: 'collaboration.user' },
      ],
      where,
    });
    const dataMap = data?.data.map((item) => {
      const isExistTutor = item?.collaboration?.some(
        (item) => item?.status !== 1 && item?.status !== 2,
      );
      const isUserRegistered =
        userId && item?.collaboration?.some((item) => item?.user?.id === userId);

      return { ...item, collaboration: null, isExistTutor, isUserRegistered };
    });
    return { data: dataMap, totals: data?.totals };
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<NullableType<Posts>> {
    return this.postsService.findOne({ id: +id }, [
      { entity: 'skill', field: 'skills' },
      { entity: 'gradeLevel', field: 'gradeLevels' },
      { entity: 'certification', field: 'certifications' },
      { entity: 'subject', field: 'subjects' },
      { entity: 'post_time_availability', field: 'postTimeAvailability' },
      { entity: 'wards', field: 'wards' },
      { entity: 'districts', field: 'wards.districts' },
      { entity: 'province', field: 'districts.province' },
      { entity: 'user', field: 'user' },
      { entity: 'photo', field: 'user.photo' },
    ]);
  }

  @Roles()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: number, @Body() createPostsDto: any): Promise<Posts[]> {
    const skills = createPostsDto?.skills?.map((item) => ({
      id: item,
    }));

    const certifications = createPostsDto?.certification?.map((item) => ({
      id: item,
    }));
    const gradeLevels =
      createPostsDto?.gradeLevel?.length > 0
        ? createPostsDto?.gradeLevel?.map((item) => ({
            id: item,
          }))
        : [{ id: createPostsDto.gradeLevel }];

    const subjects = createPostsDto?.subject?.map((item) => ({
      id: item,
    }));
    const postPayLoad = {
      address: createPostsDto?.address,
      dayWeek: createPostsDto?.dayWeek,

      fee: createPostsDto?.fee,

      timeDay: createPostsDto?.timeDay,
      perTime: createPostsDto?.perTime,
      requestDetailVI: createPostsDto?.requestDetailVI,
      requestSummaryVI: createPostsDto?.requestSummaryVI,

      timeStart: createPostsDto?.timeStart,
      type: createPostsDto?.type,
      wards: createPostsDto?.wards,
      skills,

      certifications,
      gradeLevels,
      subjects,
    };

    const timeAvailability = createPostsDto.timeAvailability?.map((item) => {
      const [dayofWeek, hour] = item?.split('__');

      return { dayofWeekId: Number(dayofWeek), hourId: Number(hour), postsId: id };
    });
    if (timeAvailability) {
      const dataFind = await this.postTimeAvailabilityService.findMany({ postsId: id });
      if (dataFind) {
        const newRow = differenceWith(timeAvailability, dataFind, (source: any, compare: any) => {
          return source.dayofWeekId === compare.dayofWeekId && source.hourId === compare.hourId;
        });

        const deleteRow = differenceWith(dataFind, timeAvailability, (source, compare: any) => {
          return source.dayofWeekId === compare.dayofWeekId && source.hourId === compare.hourId;
        })?.map(({ postsId, dayofWeekId, hourId }) => ({
          postsId,
          dayofWeekId,
          hourId,
        }));

        !isEmpty(newRow) && void this.postTimeAvailabilityService.createMany(newRow);
        !isEmpty(deleteRow) &&
          deleteRow.forEach((id) => {
            void this.postTimeAvailabilityService.delete(id);
          });
      }
    }

    // try {
    //   // void this.postGradeService.createMany(gradeLevel);
    //   // void this.postSkillsService.createMany(skills);
    //   // void this.postSubjectService.createMany(subject);

    //   // void this.postCertificationService.createMany(certifications);
    //   void this.postTimeAvailabilityService.createMany(timeAvailability);
    // } catch (err) {
    //   console.log(err);
    // }

    return this.postsService.update(id, postPayLoad);
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number): Promise<void> {
    return this.postsService.softDelete(id);
  }
}
