import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Users } from 'src/models/entities/Users.entity';
import { hashPassword } from 'src/utillities/password';
import { EntityManager, InsertResult } from 'typeorm';

import { CreateUserDTO } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(@InjectEntityManager() private readonly db: EntityManager) {}

  async create(user: CreateUserDTO): Promise<InsertResult> {
    const hash = await hashPassword(user.password);
    const newUser = this.db.getRepository(Users).create({
      ...user,
      password: hash,
    });

    return this.db.getRepository(Users).insert(newUser);
  }

  async getUserByUserName(userName: string, hasPassword = false): Promise<Users> {
    return this.db.getRepository(Users).findOne({
      select: {
        username: true,
        password: hasPassword,
        role: true,
        tel: true,
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
