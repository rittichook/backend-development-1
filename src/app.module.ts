import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { database } from './config/database';
import { environmentValidate } from './config/env.validation';
import { AuthModule } from './services/auth/auth.module';
import { UsersModule } from './services/users/users.module';
import { CalendarModule } from './services/calendar/calendar.module';
import { SectionsModule } from './services/sections/sections.module';
import { MembersModule } from './services/members/members.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env'],
      expandVariables: true,
      isGlobal: true,
      validate: environmentValidate,
    }),
    database,
    UsersModule,
    AuthModule,
    CalendarModule,
    SectionsModule,
    MembersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
