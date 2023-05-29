import { Module } from '@nestjs/common';

import { CalendarService } from '../calendar/calendar.service';
import { SectionsController } from './sections.controller';
import { SectionsService } from './sections.service';

@Module({
  controllers: [SectionsController],
  providers: [SectionsService, CalendarService],
})
export class SectionsModule {}
