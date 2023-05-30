import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { SectionPeriods } from './SectionPeriods.entity';
import { SectionUsers } from './SectionUsers.entity';
import { Subjects } from './Subjects.entity';

@Entity('subject_sections', { schema: 'public' })
export class SubjectSections {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @Column('uuid', { name: 'subject_id' })
  subjectId: string;

  @Column('character varying', { name: 'name', length: 100 })
  name: string;

  @Column('text', { name: 'description', nullable: true })
  description: string | null;

  @Column('uuid', { name: 'owner' })
  owner: string;

  @Column('timestamp with time zone', { name: 'section_start' })
  sectionStart: Date;

  @Column('timestamp with time zone', { name: 'section_end' })
  sectionEnd: Date;

  @Column('boolean', { name: 'status', default: () => 'true' })
  status: boolean;

  @Column('boolean', { name: 'is_calendar', default: () => 'false' })
  isCalendar: boolean;

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

  @ManyToOne(() => Subjects, (v) => v.subjectSections)
  @JoinColumn({ name: 'subject_id' })
  subject: Subjects;

  @OneToMany(() => SectionPeriods, (v) => v.section)
  periods: SectionPeriods[];

  @OneToMany(() => SectionUsers, (v) => v.section)
  users: SectionUsers[];
}
