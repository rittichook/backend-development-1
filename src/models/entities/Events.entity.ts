import { Column, Entity } from 'typeorm';

@Entity('events', { schema: 'public' })
export class Events {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @Column('character varying', { name: 'type', length: 50 })
  type: string;

  @Column('character varying', { name: 'title', length: 100 })
  title: string;

  @Column('text', { name: 'description', nullable: true })
  description: string | null;

  @Column('date', { name: 'start_date' })
  startDate: string;

  @Column('date', { name: 'end_date' })
  endDate: string;

  @Column('character varying', { name: 'time_start', length: 30 })
  timeStart: string;

  @Column('character varying', { name: 'time_end', length: 30 })
  timeEnd: string;

  @Column('boolean', { name: 'all_day', default: () => 'false' })
  allDay: boolean;

  @Column('boolean', { name: 'is_online', default: () => 'false' })
  isOnline: boolean;

  @Column('character varying', {
    name: 'online_url',
    nullable: true,
    length: 200,
  })
  onlineUrl: string | null;

  @Column('character varying', {
    name: 'location',
    nullable: true,
    length: 200,
  })
  location: string | null;

  @Column('character varying', {
    name: 'location_url',
    nullable: true,
    length: 200,
  })
  locationUrl: string | null;

  @Column('uuid', { name: 'owner' })
  owner: string;

  @Column('boolean', { name: 'status', default: () => 'true' })
  status: boolean;

  @Column('timestamp with time zone', {
    name: 'created_at',
    default: () => 'now()',
  })
  createdAt: Date;

  @Column('uuid', { name: 'created_by', nullable: true })
  createdBy: string | null;

  @Column('timestamp with time zone', {
    name: 'updated_at',
    default: () => 'now()',
  })
  updatedAt: Date;

  @Column('uuid', { name: 'updated_by', nullable: true })
  updatedBy: string | null;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @Column('uuid', { name: 'deleted_by', nullable: true })
  deletedBy: string | null;
}
