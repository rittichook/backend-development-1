import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { CRUDColumn } from '../constants/crud';

export class CreateTableCalendars1685297330066 implements MigrationInterface {
  private TableName = 'calendars';
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
            name: 'event_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'section_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'owner',
            type: 'uuid',
          },
          {
            name: 'start_date',
            type: 'timestamp',
          },
          {
            name: 'end_date',
            type: 'timestamp',
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
