import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateEventDTO } from './dto/events.dto';
import { EventsService } from './events.service';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @HttpCode(200)
  @Post()
  createEvent(@Body() payload: CreateEventDTO): void {
    return this.eventsService.createEvent(payload);
  }
}
