import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { SubjectSections } from './SubjectSections.entity';

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

  @ManyToOne(() => SubjectSections, (v) => v.periods)
  @JoinColumn({ name: 'section_subject_id' })
  section: SubjectSections;
}
