import { Column, Entity } from 'typeorm';

@Entity('calendar_room', { schema: 'public' })
export class CalendarRoom {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @Column('uuid', { name: 'calendar_id' })
  calendarId: string;

  @Column('uuid', { name: 'room_id' })
  roomId: string;
}
