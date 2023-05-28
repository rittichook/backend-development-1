import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { CRUDColumn } from '../constants/crud';

export class CreateTableEvents1685292626194 implements MigrationInterface {
  private TableName = 'events';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.TableName,
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'type',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'title',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'start_date',
            type: 'date',
          },
          {
            name: 'end_date',
            type: 'date',
          },
          {
            name: 'time_start',
            type: 'varchar',
            length: '30',
          },
          {
            name: 'time_end',
            type: 'varchar',
            length: '30',
          },
          {
            name: 'all_day',
            type: 'boolean',
            default: false,
          },
          {
            name: 'is_online',
            type: 'boolean',
            default: false,
          },
          {
            name: 'online_url',
            type: 'varchar',
            length: '200',
            isNullable: true,
          },
          {
            name: 'location',
            type: 'varchar',
            length: '200',
            isNullable: true,
          },
          {
            name: 'location_url',
            type: 'varchar',
            length: '200',
            isNullable: true,
          },
          {
            name: 'owner',
            type: 'uuid',
          },
          {
            name: 'status',
            type: 'boolean',
            default: true,
          },
          ...CRUDColumn,
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.TableName);
  }
}
