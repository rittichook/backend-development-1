import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { CRUDColumn } from '../constants/crud';

export class CreateTableSectionPeriods1685178231560 implements MigrationInterface {
  private TableName = 'section_periods';
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
            name: 'section_subject_id',
            type: 'uuid',
          },
          {
            name: 'is_online',
            type: 'boolean',
            default: false,
          },
          {
            name: 'online_url',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'room_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'day_of_week',
            type: 'varchar',
            length: '10',
          },
          {
            name: 'time_start',
            type: 'time',
          },
          {
            name: 'time_end',
            type: 'time',
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
