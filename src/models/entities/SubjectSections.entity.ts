import { Column, Entity } from 'typeorm';

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

  @Column('timestamp without time zone', { name: 'section_start' })
  sectionStart: Date;

  @Column('timestamp without time zone', { name: 'section_end' })
  sectionEnd: Date;

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
