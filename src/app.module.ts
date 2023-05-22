import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { database } from './config/database';
import { environmentValidate } from './config/env.validation';
import { AuthModule } from './services/auth/auth.module';
import { UsersModule } from './services/users/users.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
