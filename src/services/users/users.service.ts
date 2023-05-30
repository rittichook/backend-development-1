import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import dayjs from 'dayjs';
import { CalendarUsers } from 'src/models/entities/CalendarUsers.entity';
import { Users } from 'src/models/entities/Users.entity';
import { ECalendarFilterOption } from 'src/type/calendar.type';
import { EntityManager } from 'typeorm';

import { FilterOptionCalendarDTO, MyCalendarResDTO } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(@InjectEntityManager() private readonly db: EntityManager) {}

  async getProfile(uid: string): Promise<Users> {
    return this.db.getRepository(Users).findOne({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        avatar: true,
        tel: true,
      },
      where: {
        id: uid,
        status: true,
      },
    });
  }

  async getCalendars(uid: string, filterOption: FilterOptionCalendarDTO): Promise<MyCalendarResDTO[]> {
    let dateStart: string = null;
    let dateEnd: string = null;
    const now = dayjs(filterOption.date);

    if (filterOption.type === ECalendarFilterOption.MONTH) {
      dateStart = now.startOf('month').startOf('date').format('YYYY-MM-DD HH:mm:ss');
      dateEnd = now.endOf('month').endOf('date').format('YYYY-MM-DD HH:mm:ss');
    } else if (filterOption.type === ECalendarFilterOption.WEEK) {
      dateStart = now.startOf('week').startOf('date').format('YYYY-MM-DD HH:mm:ss');
      dateEnd = now.endOf('week').endOf('date').format('YYYY-MM-DD HH:mm:ss');
    } else {
      dateStart = now.startOf('date').format('YYYY-MM-DD HH:mm:ss');
      dateEnd = now.endOf('date').format('YYYY-MM-DD HH:mm:ss');
    }

    const query = this.db.getRepository(CalendarUsers).createQueryBuilder('main');

    // join calendars
    query.addSelect([
      'calendar.id',
      'calendar.type',
      'calendar.code',
      'calendar.title',
      'calendar.description',
      'calendar.isOnline',
      'calendar.onlineUrl',
      'calendar.location',
      'calendar.locationUrl',
      'calendar.owner',
      'calendar.startDate',
      'calendar.endDate',
      'calendar.status',
    ]);
    query.innerJoin('main.calendar', 'calendar');

    query.addSelect(['owner.firstName', 'owner.lastName']);
    query.innerJoin('calendar.ownerData', 'owner');

    query.addSelect('calendarRoom.roomId');
    query.innerJoin('calendar.calendarRoom', 'calendarRoom');
    query.addSelect('room.name');
    query.innerJoin('calendarRoom.room', 'room');

    query.where('main.userId = :uid', { uid });
    query.andWhere('calendar.startDate BETWEEN :dateStart AND :dateEnd', { dateStart, dateEnd });

    const results = await query.getMany();
    return results.map((v): MyCalendarResDTO => {
      return {
        id: v.calendar.id,
        type: v.calendar.type,
        code: v.calendar.code,
        title: v.calendar.title,
        description: v.calendar.description,
        isOnline: v.calendar.isOnline,
        onlineUrl: v.calendar.onlineUrl,
        location: v.calendar.calendarRoom.roomId ? v.calendar.calendarRoom.room.name : v.calendar.location,
        locationUrl: v.calendar.locationUrl,
        startTime: v.calendar.startDate,
        endTime: v.calendar.endDate,
        owner: [v.calendar.ownerData.firstName || null, v.calendar.ownerData.lastName || null]
          .filter((v2) => v2)
          .join(' '),
        status: v.calendar.status,
      };
    });
  }
}
