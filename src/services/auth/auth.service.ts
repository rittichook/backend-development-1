import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/models/entities/Users.entity';
import { IUserData } from 'src/type/user.interface';
import { matchPassword } from 'src/utillities/password';

import { MembersService } from '../members/members.service';
import { ILoginResponse } from './type/auth.interface';

@Injectable()
export class AuthService {
  constructor(private readonly memberService: MembersService, private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<Users> {
    // check username
    const userData = await this.memberService.getMemberByUserName(username, true);
    if (!userData) throw new UnauthorizedException();

    // check password
    const isPassword = await matchPassword(userData.password, password);
    if (!isPassword) throw new UnauthorizedException();

    return userData;
  }

  login(user: Users): ILoginResponse {
    const payload = {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      tel: user.tel,
      avatar: user.avatar,
      sub: user.username,
      role: user.role,
    } as IUserData;
    return {
      access_token: this.jwtService.sign(payload),
    } as ILoginResponse;
  }
}
