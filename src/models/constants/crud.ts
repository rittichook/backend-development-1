import { TableColumnOptions } from 'typeorm';

export const CRUDColumn = [
  {
    name: 'created_at',
    type: 'timestamp',
    default: 'now()',
  },
  {
    name: 'created_by',
    type: 'uuid',
    isNullable: true,
  },
  {
    name: 'updated_at',
    type: 'timestamp',
    default: 'now()',
  },
  {
    name: 'updated_by',
    type: 'uuid',
    isNullable: true,
  },
  {
    name: 'deleted_at',
    type: 'timestamp',
    isNullable: true,
  },
  {
    name: 'deleted_by',
    type: 'uuid',
    isNullable: true,
  },
] as TableColumnOptions[];
