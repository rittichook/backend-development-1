import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Rooms } from './Rooms.entity';

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

  @ManyToOne(() => Rooms, (v) => v.calendarRooms)
  @JoinColumn({ name: 'room_id' })
  room: Rooms;
}
