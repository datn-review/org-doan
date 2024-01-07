import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/base.service';
import { IParams } from 'src/core/i.base.service';
import { Repository } from 'typeorm';
import { Notifications } from './entities/notifications.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { LessonsService } from '../lessons/lessons.service';
function addLeadingZero(number) {
  return number < 10 ? '0' + number : number.toString();
}
export class NotificationsRepository {}
@Injectable()
export class NotificationsService extends BaseService<
  Notifications,
  Repository<Notifications>,
  IParams
> {
  constructor(
    @InjectRepository(Notifications) repository: Repository<Notifications>,
    private readonly lessonsService: LessonsService,
  ) {
    super(repository);
  }
  @Cron('0 10 0 * * *')
  async handleCron() {
    const lessons = await this.lessonsService.findToDayAll();
    console.log('🚀 ~ file: notifications.service.ts:26 ~ handleCron ~ lessons:', lessons);
    const data: any[] = [];
    lessons?.data.forEach((lesson: any) => {
      const userStu = { id: lesson?.collaboration?.posts?.user?.id };
      const userTutor = { id: lesson?.collaboration?.user?.id };

      const date = new Date(lesson.lessonStart);
      const lessonEnd = new Date(lesson.lessonEnd);

      // const yyyy = date.getFullYear();
      // const mm = date.getMonth() + 1;
      // const dd = date.getDate();
      // const dateStrFormat = dd + '-' + mm + '-' + yyyy;

      const hour = date.getHours();
      const min = date.getMinutes();
      const hourEnd = lessonEnd.getHours();
      const minEnd = lessonEnd.getMinutes();
      const time = addLeadingZero(hour) + 'h' + addLeadingZero(min);
      const timeEnd = addLeadingZero(hourEnd) + 'h' + addLeadingZero(minEnd);

      const textVIStudent = `Hôm nay bạn có lịch học lớp ${lesson?.collaboration?.nameClass}: ${time} -> ${timeEnd}`;
      const textENStudent = `Today you have a class schedule ${lesson?.collaboration?.nameClass}: ${time} -> ${timeEnd}`;
      const textVITutor = `Hôm nay bạn có lịch dạy lớp ${lesson?.collaboration?.nameClass}: ${time} -> ${timeEnd}`;
      const textENTutor = `Today you have a class schedule ${lesson?.collaboration?.nameClass}: ${time} -> ${timeEnd}`;

      const stu = {
        ['text_VI']: textVIStudent,
        ['text_EN']: textENStudent,
        user: userStu,
        path: `/classes/${lesson.collaboration?.id}?tab=2&lesson=${lesson.id}&tabLesson=1`,
      };
      const tutor = {
        ['text_VI']: textVITutor,
        ['text_EN']: textENTutor,
        user: userTutor,
        path: `/classes/${lesson.collaboration?.id}?tab=2&lesson=${lesson.id}&tabLesson=1`,
      };
      data.push(stu);
      data.push(tutor);
    });

    void this.createMany(data as Notifications[]);
  }
}
