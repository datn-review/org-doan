import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';

import { FilesModule as FilesModuleDrive } from './files-drive/files.module';

import { AuthModule } from './auth/auth.module';
import databaseConfig from './config/database.config';
import authConfig from './config/auth.config';
import appConfig from './config/app.config';
import mailConfig from './config/mail.config';
import fileConfig from './config/file.config';
import facebookConfig from './config/facebook.config';
import googleConfig from './config/google.config';
import twitterConfig from './config/twitter.config';
import appleConfig from './config/apple.config';
import * as path from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthAppleModule } from './auth-apple/auth-apple.module';
import { AuthFacebookModule } from './auth-facebook/auth-facebook.module';
import { AuthGoogleModule } from './auth-google/auth-google.module';
import { AuthTwitterModule } from './auth-twitter/auth-twitter.module';
import { I18nModule } from 'nestjs-i18n/dist/i18n.module';
import { HeaderResolver } from 'nestjs-i18n';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { MailConfigService } from './mail/mail-config.service';
import { ForgotModule } from './forgot/forgot.module';
import { MailModule } from './mail/mail.module';
import { HomeModule } from './home/home.module';
import { DataSource, DataSourceOptions } from 'typeorm';
import { AllConfigType } from './config/config.type';

import { GradeLevelModule } from './modules/grade-level/grade-level.module';
import { SubjectModule } from './modules/subject/subject.module';
import { SkillsModule } from './modules/skills/skills.module';
import { CertificationsModule } from './modules/certifications/certifications.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { TutorSkillsModule } from './modules/tutor-skills/tutor-skills.module';
import { TutorCertificationModule } from './modules/tutor-certification/tutor-certification.module';
import { TutorSubjectGradeModule } from './modules/tutor-subject-grade/tutor-subject-grade.module';
import { TimeAvailabilityModule } from './modules/time-availability/time-availability.module';
import { ConversationModule } from './modules/conversation/conversation.module';
import { PostsModule } from './modules/posts/posts.module';
import { CollaborationModule } from './modules/collaboration/collaboration.module';
import { PaymentModule } from './modules/payment/payment.module';
import { LessonsModule } from './modules/lessons/lessons.module';
import { DistrictsModule } from './modules/provinces/districts/districts.module';
import { ProvinceModule } from './modules/provinces/province/province.module';
import { WardsModule } from './modules/provinces/wards/wards.module';
import { PostTimeAvailabilityModule } from './modules/posts/post-time-availability/post-time-availability.module';
import { ExerciseModule } from './modules/assessment/exercise/exercise.module';
import { QuestionModule } from './modules/assessment/question/question.module';
import { AssignmentModule } from './modules/assessment/assignment/assignment.module';
import { ChatBotModule } from './modules/chat/chat-bot/chat-bot.module';
import { ChatModule } from './modules/chat/chat-message/chat.module';
import { RoomModule } from './modules/chat/room/room.module';
import { FeedbackModule } from './modules/feedback/feedback.module';
export const envFilePath = process.env.NODE_ENV === 'production' ? `.env.prod` : `.env`;

console.log('🚀 ~ file: app.module.ts:64 ~  process.env.NODE_ENV:', process.env.NODE_ENV);
console.log('🚀 ~ file: app.module.ts:64 ~ envFilePath:', envFilePath);
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        databaseConfig,
        authConfig,
        appConfig,
        mailConfig,
        fileConfig,
        facebookConfig,
        googleConfig,
        twitterConfig,
        appleConfig,
      ],
      envFilePath: [envFilePath],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
    MailerModule.forRootAsync({
      useClass: MailConfigService,
    }),
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService<AllConfigType>) => ({
        fallbackLanguage: configService.getOrThrow('app.fallbackLanguage', {
          infer: true,
        }),
        loaderOptions: { path: path.join(__dirname, '/i18n/'), watch: true },
      }),
      resolvers: [
        {
          use: HeaderResolver,
          useFactory: (configService: ConfigService) => {
            return [configService.get('app.headerLanguage')];
          },
          inject: [ConfigService],
        },
      ],
      imports: [ConfigModule],

      inject: [ConfigService],
    }),
    UsersModule,
    FilesModule,
    AuthModule,
    AuthFacebookModule,
    AuthGoogleModule,
    AuthTwitterModule,
    AuthAppleModule,
    ForgotModule,
    MailModule,
    HomeModule,
    FilesModuleDrive,
    GradeLevelModule,
    SubjectModule,
    SkillsModule,
    CertificationsModule,
    NotificationsModule,
    TutorSkillsModule,
    TutorCertificationModule,
    TutorSubjectGradeModule,
    TimeAvailabilityModule,
    ConversationModule,
    PostsModule,
    CollaborationModule,
    PaymentModule,
    LessonsModule,
    ProvinceModule,
    DistrictsModule,
    WardsModule,
    PostTimeAvailabilityModule,
    ExerciseModule,
    QuestionModule,
    AssignmentModule,
    ChatBotModule,
    ChatModule,
    RoomModule,
    FeedbackModule,
  ],
})
export class AppModule {}
