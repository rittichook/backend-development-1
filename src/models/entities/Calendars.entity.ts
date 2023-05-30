import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { CalendarRoom } from './CalendarRoom.entity';
import { CalendarUsers } from './CalendarUsers.entity';
import { Users } from './Users.entity';

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

  @Column('character varying', { name: 'code', length: 30, nullable: true })
  code: string | null;

  @Column('character varying', { name: 'title', length: 100 })
  title: string;

  @Column('text', { name: 'description', nullable: true })
  description: string | null;

  @Column('uuid', { name: 'event_id', nullable: true })
  eventId: string | null;

  @Column('uuid', { name: 'section_id', nullable: true })
  sectionId: string | null;

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

  @Column('timestamp with time zone', { name: 'start_date' })
  startDate: Date;

  @Column('timestamp with time zone', { name: 'end_date' })
  endDate: Date;

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

  @OneToOne(() => CalendarRoom)
  @JoinColumn({ name: 'id', referencedColumnName: 'calendarId' })
  calendarRoom: CalendarRoom;

  @OneToMany(() => CalendarUsers, (v) => v.calendarId)
  inviteUsers: CalendarUsers[];

  @OneToOne(() => Users, (v) => v.id)
  @JoinColumn({ name: 'owner' })
  ownerData: Users;
}
