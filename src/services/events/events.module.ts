import { Module } from '@nestjs/common';

import { CalendarService } from '../calendar/calendar.service';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

@Module({
  controllers: [EventsController],
  providers: [EventsService, CalendarService],
})
export class EventsModule {}
