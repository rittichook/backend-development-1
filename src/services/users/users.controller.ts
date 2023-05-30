import { Controller, Get, Logger, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorators/user.decorator';
import { Users } from 'src/models/entities/Users.entity';
import { IUserData } from 'src/type/user.interface';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FilterOptionCalendarDTO, MyCalendarResDTO } from './dto/users.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  private logger = new Logger(UsersController.name);
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  async profile(@User() user: IUserData): Promise<Users> {
    return this.usersService.getProfile(user.id);
  }

  @Get('calendars')
  async calendars(
    @User() user: IUserData,
    @Query() filterOption: FilterOptionCalendarDTO,
  ): Promise<MyCalendarResDTO[]> {
    return this.usersService.getCalendars(user.id, filterOption);
  }
}
