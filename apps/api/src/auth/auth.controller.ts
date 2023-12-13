import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Request,
  Post,
  UseGuards,
  Patch,
  Delete,
  SerializeOptions,
  Param,
  UseInterceptors,
  UploadedFile,
  Put,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { AuthForgotPasswordDto } from './dto/auth-forgot-password.dto';
import { AuthConfirmEmailDto } from './dto/auth-confirm-email.dto';
import { AuthResetPasswordDto } from './dto/auth-reset-password.dto';
import { AuthUpdateDto } from './dto/auth-update.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { LoginResponseType } from '../utils/types/auth/login-response.type';
import { User } from '../users/entities/user.entity';
import { NullableType } from '../utils/types/nullable.type';
import { FileInterceptor } from '@nestjs/platform-express';
import { TutorCertificationService } from 'src/modules/tutor-certification/tutor-certification.service';
import { TutorSubjectGradeService } from 'src/modules/tutor-subject-grade/tutor-subject-grade.service';
import { TutorSkillsService } from 'src/modules/tutor-skills/tutor-skills.service';
import { TutorTimeAvailabilityService } from 'src/users/tutor-time-availability/tutor-time-availability.service';
import { differenceBy, differenceWith, isEmpty } from 'lodash';
import { FilesService } from 'src/files-drive/files.service';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(
    private readonly service: AuthService,
    private readonly tutorCertificationService: TutorCertificationService,
    private readonly tutorSubjectGradeService: TutorSubjectGradeService,
    private readonly tutorSkillsService: TutorSkillsService,
    private readonly tutorTimeAvailabilityService: TutorTimeAvailabilityService,
    private readonly filesService: FilesService,
  ) {}

  @SerializeOptions({
    groups: ['me'],
  })
  @Post('email/login')
  @HttpCode(HttpStatus.OK)
  public login(@Body() loginDto: AuthEmailLoginDto): Promise<LoginResponseType> {
    return this.service.validateLogin(loginDto, false);
  }

  @SerializeOptions({
    groups: ['me'],
  })
  @Post('admin/email/login')
  @HttpCode(HttpStatus.OK)
  public adminLogin(@Body() loginDTO: AuthEmailLoginDto): Promise<LoginResponseType> {
    return this.service.validateLogin(loginDTO, true);
  }

  @Post('email/register')
  @HttpCode(HttpStatus.NO_CONTENT)
  async register(@Body() createUserDto: AuthRegisterLoginDto): Promise<void> {
    return this.service.register(createUserDto);
  }

  @Post('email/confirm')
  @HttpCode(HttpStatus.NO_CONTENT)
  async confirmEmail(@Body() confirmEmailDto: AuthConfirmEmailDto): Promise<void> {
    return this.service.confirmEmail(confirmEmailDto.hash);
  }

  @Post('forgot/password')
  @HttpCode(HttpStatus.NO_CONTENT)
  async forgotPassword(@Body() forgotPasswordDto: AuthForgotPasswordDto): Promise<void> {
    return this.service.forgotPassword(forgotPasswordDto.email);
  }

  @Post('reset/password')
  @HttpCode(HttpStatus.NO_CONTENT)
  resetPassword(@Body() resetPasswordDto: AuthResetPasswordDto): Promise<void> {
    return this.service.resetPassword(resetPasswordDto.hash, resetPasswordDto.password);
  }

  @ApiBearerAuth()
  @SerializeOptions({
    groups: ['me'],
  })
  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  public me(@Request() request): Promise<NullableType<User>> {
    return this.service.me(request.user);
  }

  @ApiBearerAuth()
  @SerializeOptions({
    groups: ['me'],
  })
  @Put('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('photo'))
  @HttpCode(HttpStatus.OK)
  public async update(
    @Request() request,
    @Body() updateProfileDto: any,
    @UploadedFile() photo: Express.Multer.File,
  ): Promise<NullableType<User>> {
    const id = request?.user?.id;
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
        const newRow = differenceWith(timeAvailability, dataFind, (source: any, compare) => {
          return source.dayofWeekId === compare.dayofWeekId && source.hourId === compare.hourId;
        });

        const deleteRow = differenceWith(dataFind, timeAvailability, (source, compare: any) => {
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
        const newRow = differenceWith(tutorGradeSubject, dataFind, (source: any, compare) => {
          return source.subjectId === compare.subjectId && source.gradeId === compare.gradeId;
        });

        const deleteRow = differenceWith(dataFind, tutorGradeSubject, (source, compare: any) => {
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

      return this.service.update(request.user, { ...updateProfileDto, photo: photoResult.id });
    }
    console.log(
      '🚀 ~ file: auth.controller.ts:223 ~ AuthController ~ updateProfileDto:',
      updateProfileDto,
    );
    return this.service.update(request.user, { ...updateProfileDto });
  }

  @ApiBearerAuth()
  @Delete('me')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Request() request): Promise<void> {
    return this.service.softDelete(request.user);
  }

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  public getProfileID(@Param('id') id: string): Promise<NullableType<User>> {
    return this.service.findById(Number(id));
  }
}
