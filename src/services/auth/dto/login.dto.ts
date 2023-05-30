import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDTO {
  @ApiProperty({ default: '2000001' })
  @IsString()
  username: string;

  @ApiProperty({ default: '@Password1234' })
  @IsString()
  password: string;
}
