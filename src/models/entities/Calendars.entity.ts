import { Column, Entity } from 'typeorm';

@Entity('calendars', { schema: 'public' })
export class Calendars {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @Column('character varying', { name: 'type', length: 50 })
  type: string;

  @Column('uuid', { name: 'event_id', nullable: true })
  eventId: string | null;

  @Column('uuid', { name: 'section_id', nullable: true })
  sectionId: string | null;

  @Column('uuid', { name: 'owner' })
  owner: string;

  @Column('timestamp without time zone', { name: 'start_date' })
  startDate: Date;

  @Column('timestamp without time zone', { name: 'end_date' })
  endDate: Date;

  @Column('boolean', { name: 'status', default: () => 'true' })
  status: boolean;

  @Column('timestamp without time zone', {
    name: 'created_at',
    default: () => 'now()',
  })
  createdAt: Date;

  @Column('uuid', { name: 'created_by', nullable: true })
  createdBy: string | null;

  @Column('timestamp without time zone', {
    name: 'updated_at',
    default: () => 'now()',
  })
  updatedAt: Date;

  @Column('uuid', { name: 'updated_by', nullable: true })
  updatedBy: string | null;

  @Column('timestamp without time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @Column('uuid', { name: 'deleted_by', nullable: true })
  deletedBy: string | null;
}
