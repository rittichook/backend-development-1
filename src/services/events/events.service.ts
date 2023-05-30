import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { CalendarService } from '../calendar/calendar.service';
import { CreateEventDTO } from './dto/events.dto';

@Injectable()
export class EventsService {
  constructor(@InjectDataSource() private db: DataSource, private calendarService: CalendarService) {}

  createEvent(data: CreateEventDTO): void {
    console.log(data);
  }
}
