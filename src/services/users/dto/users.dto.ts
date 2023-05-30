import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum } from 'class-validator';
import { ECalendarFilterOption } from 'src/type/calendar.type';

export class FilterOptionCalendarDTO {
  @ApiProperty()
  @IsDateString()
  date: Date;

  @ApiProperty({ enum: ECalendarFilterOption })
  @IsEnum(ECalendarFilterOption)
  type: ECalendarFilterOption;
}

export class MyCalendarResDTO {
  id: string;
  type: string;
  code: string;
  title: string;
  description: string;
  isOnline: boolean;
  onlineUrl: string;
  location: string;
  locationUrl: string;
  startTime: Date;
  endTime: Date;
  owner: string;
  status: boolean;
}
