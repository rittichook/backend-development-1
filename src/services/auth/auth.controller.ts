/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Controller, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { ILoginResponse } from './type/auth.interface';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiBody({ type: LoginDTO })
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  login(@Request() req): ILoginResponse {
    return this.authService.login(req.user);
  }
}
