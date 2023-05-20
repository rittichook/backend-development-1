import { IsEnum, IsNumber, IsString } from 'class-validator';

export enum EStage {
  DEVELOPMENT = 'development',
  UAT = 'uat',
  PRODUCTION = 'production',
}

export class EnvironmentVariables {
  @IsNumber()
  PORT: number;

  @IsEnum(EStage)
  STAGE: EStage;

  @IsNumber()
  DB_PORT: number;

  @IsString()
  DB_HOST: string;

  @IsString()
  DB_USER: string;

  @IsString()
  DB_PASSWORD: string;

  @IsString()
  DB_NAME: string;
}
