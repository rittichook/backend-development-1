import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { SubjectSections } from './SubjectSections.entity';

@Entity('section_users', { schema: 'public' })
export class SectionUsers {
  @PrimaryColumn('uuid', {
    name: 'id',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @Column('uuid', { name: 'section_id' })
  sectionId: string;

  @Column('uuid', { name: 'user_id' })
  userId: string;

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

  @ManyToOne(() => SubjectSections, (v) => v.users)
  @JoinColumn({ name: 'section_id' })
  section: SubjectSections;
}
