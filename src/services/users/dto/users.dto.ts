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
