import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { CalendarRoom } from 'src/models/entities/CalendarRoom.entity';
import { Calendars } from 'src/models/entities/Calendars.entity';
import { CalendarUsers } from 'src/models/entities/CalendarUsers.entity';
import { DataSource } from 'typeorm';

import { ICreateCalendar } from './interface/calender.interface';

@Injectable()
export class CalendarService {
  constructor(@InjectDataSource() private db: DataSource) {}

  async createCalendars(data: ICreateCalendar[], inviteUsers: string[]): Promise<void> {
    await this.db.manager.transaction(async (ts) => {
      for (const v of data) {
        // Insert Calendar
        const calendar = new Calendars();
        calendar.type = v.type;
        calendar.code = v?.code || null;
        calendar.title = v.title;
        calendar.description = v?.description || null;
        calendar.eventId = v?.eventId || null;
        calendar.sectionId = v?.sectionId || null;
        calendar.isOnline = v.isOnline;
        calendar.onlineUrl = v?.onlineUrl || null;
        calendar.location = v?.location || null;
        calendar.locationUrl = v?.locationUrl || null;
        calendar.owner = v.owner;
        calendar.startDate = v.dateStart;
        calendar.endDate = v.dateEnd;
        calendar.status = true;
        const calenderResponse = await ts.save(calendar);

        // Insert calendar room
        if (v.roomId) {
          const room = new CalendarRoom();
          room.calendarId = calenderResponse.id;
          room.roomId = v.roomId;
          await ts.save(room);
        }

        await ts.getRepository(CalendarUsers).insert([
          {
            userId: v.owner,
            calendarId: calenderResponse.id,
          },
          ...inviteUsers.map((uid) => {
            return {
              userId: uid,
              calendarId: calenderResponse.id,
            };
          }),
        ]);
      }
    });
  }
}
