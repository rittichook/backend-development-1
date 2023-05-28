import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { generateDateTimePeriods } from 'src/utillities/calendar';
import { EGenType } from 'src/utillities/interface/calendar.interface';

import { CalendarService } from './calendar.service';

@ApiTags('Calendar')
@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Get()
  get(): any {
    const date = { start: '2023-06-01', end: '2023-06-01' };
    const datePeriods = [
      { dayOfWeek: 0, dateOfMonth: 1, timeStart: '09:00:00', timeEnd: '10:30:00' },
      { dayOfWeek: 5, dateOfMonth: 1, timeStart: '13:30:00', timeEnd: '14:00:00' },
    ];

    return generateDateTimePeriods(EGenType.DAY, new Date(date.start), new Date(date.end), datePeriods);
  }
}
