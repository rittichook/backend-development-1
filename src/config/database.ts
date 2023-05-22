import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { resolve } from 'path';

export const database = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (config: ConfigService) => ({
    type: 'postgres',
    port: parseInt(config.get('DB_PORT')),
    host: String(config.get('DB_HOST')),
    username: String(config.get('DB_USER')),
    password: String(config.get('DB_PASSWORD')),
    database: String(config.get('DB_NAME')),
    synchronize: false,
    entities: [resolve(__dirname, '../models/entities/*.entity{.ts,.js}')],
    migrations: [resolve(__dirname, '../models/migration/*{.ts,.js}')],
    migrationsTableName: 'typeorm_migration_table',
    extra: {
      charset: 'utf8mb4_unicode_ci',
    },
    logging: false,
  }),
  inject: [ConfigService],
});
