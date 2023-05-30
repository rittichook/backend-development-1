import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { Calendars } from './Calendars.entity';

@Entity('calendar_users', { schema: 'public' })
export class CalendarUsers {
  @PrimaryColumn('uuid', {
    name: 'id',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @Column('uuid', { name: 'calendar_id' })
  calendarId: string;

  @Column('uuid', { name: 'user_id' })
  userId: string;

  @OneToOne(() => Calendars, (v) => v.id)
  @JoinColumn({ name: 'calendar_id' })
  calendar: Calendars;
}
