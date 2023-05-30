import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  InternalServerErrorException,
  Logger,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { EUserRole } from 'src/type/userRole.type';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateMemberDTO } from './dto/member.dto';
import { MembersService } from './members.service';

@ApiTags('Members')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(EUserRole.ADMIN)
@Controller('members')
export class MembersController {
  private logger = new Logger(MembersController.name);
  constructor(private readonly membersService: MembersService) {}

  @Post()
  @HttpCode(201)
  async createMember(@Body() payload: CreateMemberDTO): Promise<void> {
    const user = await this.membersService.getMemberByUserName(payload.username);
    if (user) {
      throw new BadRequestException('USERNAME_ALREADY_EXISTS');
    }

    try {
      await this.membersService.create(payload);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }
}
