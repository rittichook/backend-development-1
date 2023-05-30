import { ECalendarType } from 'src/type/calendar.type';

export interface ICreateCalendar {
  type: ECalendarType;
  sectionId?: string;
  eventId?: string;
  code?: string | null;
  title: string;
  description?: string | null;
  owner: string;
  dateStart: Date;
  dateEnd: Date;
  isOnline: boolean;
  onlineUrl?: string;
  location?: string;
  locationUrl?: string;
  roomId?: string;
}
