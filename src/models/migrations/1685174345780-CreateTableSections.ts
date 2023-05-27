import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { CRUDColumn } from '../constants/crud';

export class CreateTableSections1685174345780 implements MigrationInterface {
  private TableName = 'subject_sections';
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
            name: 'subject_id',
            type: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'owner',
            type: 'uuid',
          },
          {
            name: 'section_start',
            type: 'timestamp',
          },
          {
            name: 'section_end',
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
