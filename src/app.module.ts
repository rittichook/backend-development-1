import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { environmentValidate } from './config/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env'],
      expandVariables: true,
      isGlobal: true,
      validate: environmentValidate,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
