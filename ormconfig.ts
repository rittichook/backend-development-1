require('dotenv').config();
const { DataSource } = require('typeorm');
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['src/models/entities/*.entity{.ts,.js}'],
  migrations: ['src/models/migrations/*{.ts,.js}'],
  synchronize: false,
  migrationsTableName: 'typeorm_migration_table',
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  cli: {
    migrationsDir: 'src/models/migrations',
  },
});
