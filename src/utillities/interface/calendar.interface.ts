export enum EGenType {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
}

export interface IDateTimePeriod {
  dayOfWeek: number | null;
  dateOfMonth: number | null;
  timeStart: string;
  timeEnd: string;
}
