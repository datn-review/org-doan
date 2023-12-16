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
import { TutorTimeAvailabilityService } from '../tutor-time-availability/tutor-time-availability.service';
import { differenceBy, differenceWith, isEmpty } from 'lodash';
export const relations = [
  {
    field: 'tutorCertifications',
    entity: 'tutor_certification',
  },
  {
    field: 'tutor_certification.certification',
    entity: 'certification',
  },
  {
    field: 'tutorSkills',
    entity: 'tutor_skill',
  },
  {
    field: 'tutor_skill.skill',
    entity: 'skill',
  },

  {
    field: 'tutorTimeAvailability',
    entity: 'tutor_time_availability',
  },
  {
    field: 'tutorGradeSubject',
    entity: 'tutor_subject_grade',
  },
  {
    field: 'tutor_subject_grade.subject',
    entity: 'subject',
  },
  {
    field: 'tutor_subject_grade.grade',
    entity: 'gradeLevel',
  },
  {
    field: 'status',
    entity: 'status',
  },
  {
    field: 'photo',
    entity: 'photo',
  },
  {
    field: 'wards',
    entity: 'wards',
  },
  {
    field: 'wards.districts',
    entity: 'districts',
  },
  {
    field: 'districts.province',
    entity: 'province',
  },
];
@ApiBearerAuth()
@ApiTags('User Tutor')
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
    private readonly tutorTimeAvailabilityService: TutorTimeAvailabilityService,

    private readonly filesService: FilesService,
  ) {}
  @Roles(RoleEnum.WEB_ADMIN)
  @Roles(RoleEnum.WEB_STAFF)
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

    const user = await this.usersService.create({
      ...createProfileDto,
      photo: photoCheck.id || null,
      role: {
        id: RoleEnum.PESONAL_TUTOR,
      },
    });

    const userId = (user as unknown as User)?.id;
    const certifications = createProfileDto?.certification?.split(',').map((item) => ({
      certificationId: Number(item),
      tutor: userId,
    }));
    const skills = createProfileDto?.skills?.split(',')?.map((item) => ({
      skillId: Number(item),
      tutor: userId,
    }));
    const tutorGradeSubject = createProfileDto?.tutorGradeSubject
      ?.split(',')
      ?.map((item: string) => {
        const [subject, grade] = item.split('__');
        return {
          gradeId: Number(grade) || 0,
          subjectId: Number(subject) || 0,
          tutorId: Number(userId),
        };
      });

    const timeAvailability = createProfileDto?.timeAvailability?.split(',').map((item) => {
      const [dayofWeek, hour] = item?.split('__');
      return { dayofWeekId: Number(dayofWeek), hourId: Number(hour), tutorId: userId };
    });
    try {
      if (skills) void this.tutorSkillsService.createMany(skills);
      if (certifications) void this.tutorCertificationService.createMany(certifications);
      if (tutorGradeSubject) void this.tutorSubjectGradeService.createMany(tutorGradeSubject);
      if (timeAvailability) void this.tutorTimeAvailabilityService.createMany(timeAvailability);
    } catch (err) {
      console.log(err);
    }

    return user;
  }
  @Roles(RoleEnum.WEB_ADMIN)
  @Roles(RoleEnum.WEB_STAFF)
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
    @Query('fieldSearch', new DefaultValuePipe(['lastName', 'firstName']))
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
  @Roles()
  @Get('/active')
  @HttpCode(HttpStatus.OK)
  async findAllActive(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
    @Query('searchName', new DefaultValuePipe('')) searchName: string,
    @Query('sortBy', new DefaultValuePipe('lastName')) sortBy: string,
    @Query('sortDirection', new DefaultValuePipe('ASC')) sortDirection: string,
    @Query('fieldSearch', new DefaultValuePipe(['lastName', 'firstName']))
    fieldSearch: string | string[],
    @Query('certification', new DefaultValuePipe(0)) certification?: number,
    @Query('skills', new DefaultValuePipe(0)) skills?: number,
    @Query('grade', new DefaultValuePipe(0)) grade?: number,
    @Query('subject', new DefaultValuePipe(0)) subject?: number,
  ): Promise<InfinityPaginationResultType<any>> {
    if (limit > 50) {
      limit = 50;
    }

    const where: any = [
      {
        field: 'role',
        value: RoleEnum.PESONAL_TUTOR,
      },
    ];
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
    const data = await this.usersService.findManyWithPagination({
      page,
      limit,
      sortBy,
      sortDirection,
      status: 1,
      searchName,
      fieldSearch,
      where,
      relations: [
        ...relations,
        {
          field: 'collaboration',
          entity: 'collaboration',
        },
        {
          field: 'collaboration.feedback',
          entity: 'feedback',
        },
      ],
    });
    const dataMap = data?.data.map((item) => {
      let length = 0;
      let starSum = 0;

      item.collaboration?.forEach((collaboration) => {
        const feedback = collaboration?.feedback?.[0];
        if (!isEmpty(feedback)) {
          length++;
          const sumFeedback =
            feedback?.overallRating +
            feedback?.interactionRating +
            feedback?.qualityRatting +
            feedback?.contentRatting +
            feedback?.presentationRating;
          starSum = starSum + sumFeedback / 5;
        }
      });

      return {
        ...item,
        collaboration: null,
        star: length === 0 ? 0 : (starSum / length).toFixed(1),
      };
    });

    return { data: dataMap, totals: data?.totals };
  }
  @Roles(RoleEnum.WEB_ADMIN)
  @Roles(RoleEnum.WEB_STAFF)
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
  @Roles(RoleEnum.WEB_ADMIN)
  @Roles(RoleEnum.WEB_STAFF)
  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('photo'))
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: number,
    @Body() updateProfileDto: UpdateUserDto,
    @UploadedFile() photo: Express.Multer.File,
  ): Promise<User[]> {
    const certifications = updateProfileDto?.certification?.split(',').map((item) => ({
      certificationId: Number(item),
      tutor: id,
    }));
    const skills = updateProfileDto?.skills?.split(',')?.map((item) => ({
      skillId: Number(item),
      tutor: id,
    }));
    const tutorGradeSubject = updateProfileDto?.tutorGradeSubject
      ?.split(',')
      ?.map((item: string) => {
        const [subject, grade] = item.split('__');
        return {
          gradeId: Number(grade) || 0,
          subjectId: Number(subject) || 0,
          tutorId: id,
        };
      });

    const timeAvailability = updateProfileDto?.timeAvailability?.split(',').map((item) => {
      const [dayofWeek, hour] = item?.split('__');
      return { dayofWeekId: Number(dayofWeek), hourId: Number(hour), tutorId: id };
    });

    if (skills) {
      const tutorSkills = await this.tutorSkillsService.findMany({ tutorId: id });
      if (tutorSkills) {
        const newRow = differenceBy(skills, tutorSkills, 'skillId');
        const deleteRow = differenceBy(tutorSkills, skills, 'skillId')?.map((item) => item?.id);
        !isEmpty(newRow) && void this.tutorSkillsService.createMany(newRow);
        !isEmpty(deleteRow) &&
          deleteRow.forEach((id) => {
            void this.tutorSkillsService.softDelete(id);
          });
      }
    }
    if (certifications) {
      const dataFind = await this.tutorCertificationService.findMany({ tutorId: id });

      if (dataFind) {
        const newRow = differenceBy(certifications, dataFind, 'certificationId');

        const deleteRow = differenceBy(dataFind, certifications, 'certificationId')?.map(
          (item) => item?.id,
        );

        !isEmpty(newRow) && void this.tutorCertificationService.createMany(newRow);
        !isEmpty(deleteRow) &&
          deleteRow.forEach((id) => {
            void this.tutorCertificationService.softDelete(id);
          });
      }
    }

    if (timeAvailability) {
      const dataFind = await this.tutorTimeAvailabilityService.findMany({ tutorId: id });
      if (dataFind) {
        const newRow = differenceWith(timeAvailability, dataFind, (source, compare) => {
          return source.dayofWeekId === compare.dayofWeekId && source.hourId === compare.hourId;
        });

        const deleteRow = differenceWith(dataFind, timeAvailability, (source, compare) => {
          return source.dayofWeekId === compare.dayofWeekId && source.hourId === compare.hourId;
        })?.map(({ tutorId, dayofWeekId, hourId }) => ({
          tutorId,
          dayofWeekId,
          hourId,
        }));

        !isEmpty(newRow) && void this.tutorTimeAvailabilityService.createMany(newRow);
        !isEmpty(deleteRow) &&
          deleteRow.forEach((id) => {
            void this.tutorTimeAvailabilityService.delete(id);
          });
      }
    }
    if (tutorGradeSubject) {
      const dataFind = await this.tutorSubjectGradeService.findMany({ tutorId: id });
      if (dataFind) {
        const newRow = differenceWith(tutorGradeSubject, dataFind, (source, compare) => {
          return source.subjectId === compare.subjectId && source.gradeId === compare.gradeId;
        });

        const deleteRow = differenceWith(dataFind, tutorGradeSubject, (source, compare) => {
          return source.subjectId === compare.subjectId && source.gradeId === compare.gradeId;
        })?.map(({ tutorId, subjectId, gradeId }) => ({
          tutorId,
          subjectId,
          gradeId,
        }));

        !isEmpty(newRow) && void this.tutorSubjectGradeService.createMany(newRow);
        !isEmpty(deleteRow) &&
          deleteRow.forEach((id) => {
            void this.tutorSubjectGradeService.delete(id);
          });
      }
    }

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
