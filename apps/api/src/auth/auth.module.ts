import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AnonymousStrategy } from './strategies/anonymous.strategy';
import { UsersModule } from 'src/users/users.module';
import { ForgotModule } from 'src/forgot/forgot.module';
import { MailModule } from 'src/mail/mail.module';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { CollaborationModule } from 'src/modules/collaboration/collaboration.module';
import { FilesModule } from 'src/files-drive/files.module';
import { TutorCertificationModule } from 'src/modules/tutor-certification/tutor-certification.module';
import { TutorSkillsModule } from 'src/modules/tutor-skills/tutor-skills.module';
import { TutorSubjectGradeModule } from 'src/modules/tutor-subject-grade/tutor-subject-grade.module';
import { TutorTimeAvailabilityModule } from 'src/users/tutor-time-availability/tutor-time-availability.module';

@Module({
  imports: [
    UsersModule,
    ForgotModule,
    PassportModule,
    CollaborationModule,
    MailModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('auth.secret'),
        signOptions: {
          expiresIn: configService.get('auth.expires'),
        },
      }),
    }),
    FilesModule,
    TutorCertificationModule,
    TutorSkillsModule,
    TutorSubjectGradeModule,
    TutorTimeAvailabilityModule,
  ],
  controllers: [AuthController],
  providers: [IsExist, IsNotExist, AuthService, JwtStrategy, AnonymousStrategy],
  exports: [AuthService],
})
export class AuthModule {}
