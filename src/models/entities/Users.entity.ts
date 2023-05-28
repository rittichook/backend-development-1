import { Column, Entity } from 'typeorm';

@Entity('users', { schema: 'public' })
export class Users {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @Column('character varying', { name: 'username', unique: true, length: 50 })
  username: string;

  @Column('character varying', { name: 'password', length: 100 })
  password: string;

  @Column('character varying', { name: 'first_name', length: 50 })
  firstName: string;

  @Column('character varying', { name: 'last_name', length: 50 })
  lastName: string;

  @Column('character varying', { name: 'tel', nullable: true, length: 20 })
  tel: string | null;

  @Column('character varying', { name: 'role', length: 50 })
  role: string;

  @Column('character varying', { name: 'avatar', length: 200 })
  avatar: string | null;

  @Column('boolean', { name: 'status', default: () => 'true' })
  status: boolean;

  @Column('timestamp without time zone', {
    name: 'created_at',
    default: () => 'now()',
  })
  createdAt: Date;

  @Column('uuid', { name: 'created_by', nullable: true })
  createdBy: string;

  @Column('timestamp without time zone', {
    name: 'updated_at',
    default: () => 'now()',
  })
  updatedAt: Date;

  @Column('uuid', { name: 'updated_by', nullable: true })
  updatedBy: string;

  @Column('timestamp without time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @Column('uuid', { name: 'deleted_by', nullable: true })
  deletedBy: string;
}
