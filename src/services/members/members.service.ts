import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Users } from 'src/models/entities/Users.entity';
import { hashPassword } from 'src/utillities/password';
import { EntityManager, InsertResult } from 'typeorm';

import { CreateMemberDTO } from './dto/member.dto';

@Injectable()
export class MembersService {
  constructor(@InjectEntityManager() private readonly db: EntityManager) {}

  async create(user: CreateMemberDTO): Promise<InsertResult> {
    const hash = await hashPassword(user.password);
    const newUser = this.db.getRepository(Users).create({
      ...user,
      password: hash,
    });

    return this.db.getRepository(Users).insert(newUser);
  }

  async getMemberByUserName(userName: string, hasPassword = false): Promise<Users> {
    return this.db.getRepository(Users).findOne({
      select: {
        id: true,
        username: true,
        password: hasPassword,
        firstName: true,
        lastName: true,
        role: true,
        tel: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        username: userName,
        status: true,
      },
    });
  }
}
