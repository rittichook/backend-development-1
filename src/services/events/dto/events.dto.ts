import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateEventDTO {
  @ApiProperty({ description: 'ประเภท event' })
  @IsString()
  @MaxLength(50)
  type: string;

  @ApiProperty({ description: 'ชื่อ event' })
  @IsString()
  @MaxLength(100)
  title: string;

  @ApiPropertyOptional({ description: 'รายละเอียด' })
  @IsString()
  @IsOptional()
  description: string | null;

  @ApiProperty({ description: 'วันที่เริ่ม', type: Date })
  @IsDateString()
  startDate: string;

  @ApiProperty({ description: 'วันที่สิ้นสุด', type: Date })
  @IsDateString()
  endDate: string;

  @ApiProperty()
  @Matches(/^([01]\d|2[0-3]):(00|30)/)
  timeStart: string;

  @ApiProperty()
  @Matches(/^([01]\d|2[0-3]):(00|30)/)
  timeEnd: string;

  @ApiProperty()
  @IsBoolean()
  isOnline: boolean;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @MaxLength(200)
  onlineUrl: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @MaxLength(200)
  location: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @MaxLength(200)
  locationUrl: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  roomId: string;

  @ApiProperty()
  @IsBoolean()
  isPeriod: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt({ each: true })
  @Min(0, { each: true })
  @Max(6, { each: true })
  dayOfWeek: number[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(31)
  dateOfMonth: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID('all', { each: true })
  inviteUsers: [];
}
