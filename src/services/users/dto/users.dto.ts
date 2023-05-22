import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { EUserRole } from 'src/type/userRole.type';

export class CreateUserDTO {
  @ApiProperty({ default: '123456' })
  @IsString()
  username: string;

  @ApiProperty({ default: '' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message:
      'password must match minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character',
  })
  password: string;

  @ApiProperty({ title: 'ชื่อ' })
  @IsString()
  firstName: string;

  @ApiProperty({ title: 'นามสกุล' })
  @IsString()
  lastName: string;

  @ApiProperty({ enum: EUserRole, default: EUserRole.STUDENT })
  @IsEnum(EUserRole)
  role: EUserRole;

  @ApiPropertyOptional({ title: 'เบอร์โทร' })
  @IsString()
  @MaxLength(20)
  @IsOptional()
  tel?: string;

  @ApiProperty({ default: true })
  @IsBoolean()
  status: boolean;
}
