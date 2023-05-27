import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { CRUDColumn } from '../constants/crud';

export class CreateTableSubjects1685174333695 implements MigrationInterface {
  private TableName = 'subjects';
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
            name: 'code',
            type: 'varchar',
            length: '30',
            isUnique: true,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '100',
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
