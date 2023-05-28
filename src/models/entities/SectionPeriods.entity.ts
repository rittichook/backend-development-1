import { Column, Entity } from 'typeorm';

@Entity('section_periods', { schema: 'public' })
export class SectionPeriods {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @Column('uuid', { name: 'section_subject_id' })
  sectionSubjectId: string;

  @Column('boolean', { name: 'is_online', default: () => 'false' })
  isOnline: boolean;

  @Column('character varying', { name: 'online_url', nullable: true })
  onlineUrl: string | null;

  @Column('uuid', { name: 'room_id', nullable: true })
  roomId: string | null;

  @Column('integer', { name: 'day_of_week', nullable: true })
  dayOfWeek: number | null;

  @Column('time without time zone', { name: 'time_start' })
  timeStart: string;

  @Column('time without time zone', { name: 'time_end' })
  timeEnd: string;

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

  @Column('integer', { name: 'date_of_month', nullable: true })
  dateOfMonth: number | null;
}
