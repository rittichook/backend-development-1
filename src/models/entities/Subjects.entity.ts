import { Column, Entity, Index, OneToMany } from 'typeorm';

import { SubjectSections } from './SubjectSections.entity';

@Index('UQ_542cbba74dde3c82ab49c573109', ['code'], { unique: true })
@Entity('subjects', { schema: 'public' })
export class Subjects {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @Column('character varying', { name: 'code', unique: true, length: 30 })
  code: string;

  @Column('character varying', { name: 'name', length: 100 })
  name: string;

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

  @OneToMany(() => SubjectSections, (v) => v.subject)
  subjectSections: SubjectSections[];
}
