import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/models/entities/Users.entity';
import { matchPassword } from 'src/utillities/password';

import { UsersService } from '../users/users.service';
import { ILoginResponse } from './type/auth.interface';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<Users> {
    // check username
    const userData = await this.userService.getUserByUserName(username, true);
    if (!userData) throw new UnauthorizedException();

    // check password
    const isPassword = await matchPassword(userData.password, password);
    if (!isPassword) throw new UnauthorizedException();

    return userData;
  }

  login(user: Users): ILoginResponse {
    const payload = { username: user.username, sub: user.username, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    } as ILoginResponse;
  }
}
