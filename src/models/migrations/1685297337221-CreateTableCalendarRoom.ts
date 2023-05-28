import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableCalendarRoom1685297337221 implements MigrationInterface {
  private TableName = 'calendar_room';
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
            name: 'calendar_id',
            type: 'uuid',
          },
          {
            name: 'room_id',
            type: 'uuid',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.TableName);
  }
}
