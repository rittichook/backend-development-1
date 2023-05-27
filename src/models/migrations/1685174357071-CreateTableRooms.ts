import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { CRUDColumn } from '../constants/crud';

export class CreateTableRooms1685174357071 implements MigrationInterface {
  private TableName = 'rooms';
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
            name: 'name',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'detail',
            type: 'text',
            isNullable: true,
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
