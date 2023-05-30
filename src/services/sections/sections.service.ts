import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { SubjectSections } from 'src/models/entities/SubjectSections.entity';
import { ECalendarType } from 'src/type/calendar.type';
import { generateDateTimePeriods } from 'src/utillities/calendar';
import { EGenType } from 'src/utillities/interface/calendar.interface';
import { EntityManager } from 'typeorm';

import { CalendarService } from '../calendar/calendar.service';
import { ICreateCalendar } from '../calendar/interface/calender.interface';

@Injectable()
export class SectionsService {
  constructor(@InjectEntityManager() private readonly db: EntityManager, private calendarService: CalendarService) {}

  async createCalendar(id = '4d4755fa-6dcb-4a4d-aa2d-86ca4b9db8cd'): Promise<void> {
    const query = await this.db.getRepository(SubjectSections).findOne({
      relations: {
        subject: true,
        periods: true,
        users: true,
      },
      where: {
        id,
      },
    });

    const inviteUsers = query.users.map((v) => v.userId);
    const calendar = {
      sectionId: query.id,
      code: query.subject.code,
      title: `${query.subject.name}`,
      description: '',
      type: ECalendarType.TIMETABLE,
      owner: query.owner,
    };

    const calendars: ICreateCalendar[] = [];

    const dateList = generateDateTimePeriods(
      EGenType.WEEK,
      new Date(query.sectionStart),
      new Date(query.sectionEnd),
      query.periods.map((v) => {
        return {
          dayOfWeek: v.dayOfWeek,
          dateOfMonth: null,
          timeStart: v.timeStart,
          timeEnd: v.timeEnd,
        };
      }),
    );

    dateList.forEach((v) => {
      const period = query.periods.filter((p) => {
        if (
          p.dayOfWeek === v[0].day() &&
          p.timeStart === v[0].format('HH:mm:ss') &&
          p.timeEnd === v[1].format('HH:mm:ss')
        ) {
          return true;
        }
        return false;
      });
      if (period.length) {
        calendars.push({
          ...calendar,
          dateStart: v[0].toDate(),
          dateEnd: v[1].toDate(),
          isOnline: period[0].isOnline,
          onlineUrl: period[0].onlineUrl,
          roomId: period[0].roomId,
        });
      }
    });
    try {
      await this.calendarService.createCalendars(calendars, inviteUsers);
    } catch (error) {
      console.log(error);
    }
  }
}
