import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
  SerializeOptions,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/roles.guard';
import { User } from '../entities/user.entity';
import { InfinityPaginationResultType } from '../../utils/types/infinity-pagination-result.type';
import { NullableType } from '../../utils/types/nullable.type';
import { FileInterceptor } from '@nestjs/platform-express';
import { TutorCertificationService } from 'src/modules/tutor-certification/tutor-certification.service';
import { FilesService } from 'src/files-drive/files.service';
import { TutorSubjectGradeService } from 'src/modules/tutor-subject-grade/tutor-subject-grade.service';
import { TutorSkillsService } from 'src/modules/tutor-skills/tutor-skills.service';
const relations = [
  {
    field: 'tutorCertifications',
    entity: 'tutor_certification',
  },
  {
    field: 'tutor_certification.certification',
    entity: 'certification',
  },
  {
    field: 'status',
    entity: 'status',
  },
  {
    field: 'photo',
    entity: 'photo',
  },
];
@ApiBearerAuth()
@ApiTags('User Tutor')
@Roles(RoleEnum.WEB_ADMIN)
@Roles(RoleEnum.WEB_STAFF)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({
  path: 'users/tutor',
  version: '1',
})
export class UsersTutorController {
  postSkillsService: any;
  constructor(
    private readonly usersService: UsersService,
    private readonly tutorCertificationService: TutorCertificationService,
    private readonly tutorSubjectGradeService: TutorSubjectGradeService,
    private readonly tutorSkillsService: TutorSkillsService,

    private readonly filesService: FilesService,
  ) {}

  @SerializeOptions({
    groups: ['admin'],
  })
  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('photo'))
  async create(
    @UploadedFile() photo: Express.Multer.File,
    @Body() createProfileDto: CreateUserDto,
  ): Promise<User[]> {
    let photoCheck = { id: null };
    if (photo) {
      photoCheck = await this.filesService.uploadFile(photo);
    }
    console.log(
      '🚀 ~ file: users.tutor.controller.ts:87 ~ UsersTutorController ~ photoCheck:',
      photoCheck,
    );
    const user = await this.usersService.create({
      ...createProfileDto,
      photo: photoCheck.id || null,
      role: {
        id: RoleEnum.PESONAL_TUTOR,
      },
    });

    const userId = (user as unknown as User)?.id;
    const certifications = createProfileDto?.certification?.split(',').map((item) => ({
      certification: item,
      tutor: userId,
    }));
    const skills = createProfileDto?.skills?.split(',')?.map((item) => ({
      skillsId: item,
      tutor: userId,
    }));
    const tutorGradeSubject = createProfileDto?.tutorGradeSubject
      ?.split(',')
      ?.map((item: string) => {
        const [grade, subject] = item.split('__');
        return {
          grade,
          subject,
          tutor: userId,
        };
      });

    console.log(
      '🚀 ~ file: users.tutor.controller.ts:85 ~ UsersTutorController ~ certifications ~ certifications:',
      certifications,
    );
    // const gradeLevel = createPostsDto?.gradeLevel?.map((item) => ({
    //   gradeLevelId: item,
    //   postsId,
    // }));

    // const subject = createPostsDto?.subject?.map((item) => ({
    //   subjectId: item,
    //   postsId,
    // }));
    // const timeAvailability = createPostsDto.timeAvailability?.map((item) => {
    //   const [dayofWeek, hour] = item?.split('__');

    //   return { dayofWeekId: Number(dayofWeek), hourId: Number(hour), postsId };
    // });

    try {
      // void this.postGradeService.createMany(gradeLevel);
      if (skills) void this.tutorSkillsService.createMany(skills);
      // void this.postSubjectService.createMany(subject);
      if (certifications) void this.tutorCertificationService.createMany(certifications);
      if (tutorGradeSubject) void this.tutorSubjectGradeService.createMany(tutorGradeSubject);
    } catch (err) {
      console.log(err);
    }

    return user;
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Get('/')
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('status', new DefaultValuePipe(10), ParseIntPipe) status: number,
    @Query('searchName', new DefaultValuePipe('')) searchName: string,
    @Query('sortBy', new DefaultValuePipe(10)) sortBy: string,
    @Query('sortDirection', new DefaultValuePipe(10)) sortDirection: string,
    @Query('fieldSearch', new DefaultValuePipe(['lastName, firstName']))
    fieldSearch: string | string[],
  ): Promise<InfinityPaginationResultType<User>> {
    if (limit > 50) {
      limit = 50;
    }

    return await this.usersService.findManyWithPagination({
      page,
      limit,
      sortBy,
      sortDirection,
      status,
      searchName,
      fieldSearch,
      where: [
        {
          field: 'role',
          value: RoleEnum.PESONAL_TUTOR,
        },
      ],
      relations,
    });
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<NullableType<User>> {
    return this.usersService.findOne(
      {
        id: +id,
      },
      relations,
    );
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('photo'))
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: number,
    @Body() updateProfileDto: UpdateUserDto,
    @UploadedFile() photo: Express.Multer.File,
  ): Promise<User[]> {
    if (photo) {
      const photoResult = await this.filesService.uploadFile(photo);

      return this.usersService.update(id, { ...updateProfileDto, photo: photoResult.id });
    }
    return this.usersService.update(id, { ...updateProfileDto });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number): Promise<void> {
    return this.usersService.softDelete(id);
  }
}
