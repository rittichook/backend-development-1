import dayjs, { Dayjs } from 'dayjs';
import _ from 'lodash';

import { EGenType, IDateTimePeriod } from './interface/calendar.interface';

export const generateDateTimePeriods = (
  type: EGenType,
  dateStart: Date,
  dateEnd: Date,
  datePeriods: IDateTimePeriod[],
): Dayjs[][] => {
  let allDateTime: Dayjs[] = [];
  datePeriods.forEach((period) => {
    let startDate: Dayjs | null = null;
    let endDate: Dayjs | null = null;
    if (type === EGenType.WEEK) {
      startDate = dayjs.tz(dateStart).startOf('week').add(period.dayOfWeek, 'day');
      endDate = dayjs.tz(dateEnd).startOf('week').add(period.dayOfWeek, 'day');
    } else if (type === EGenType.MONTH) {
      startDate = dayjs.tz(dateStart).startOf('month');
      endDate = dayjs.tz(dateEnd).endOf('month');
    } else {
      startDate = endDate = dayjs.tz(dateStart);
    }

    let currentDate = startDate;
    const timeStart = period.timeStart.split(':').map((v) => parseInt(v));
    const timeEnd = period.timeEnd.split(':').map((v) => parseInt(v));
    while (currentDate.isBefore(endDate)) {
      if (type === EGenType.WEEK) {
        if (currentDate.isBetween(dateStart, dateEnd, 'day', '[]') && currentDate.day() === period.dayOfWeek) {
          allDateTime.push(dayjs.tz(currentDate).set('hour', timeStart[0]).set('minute', timeStart[1]));
          allDateTime.push(dayjs.tz(currentDate).set('hour', timeEnd[0]).set('minute', timeEnd[1]));
        }
      } else if (type == EGenType.MONTH) {
        if (currentDate.isBetween(dateStart, dateEnd, 'day', '[]') && currentDate.date() === period.dateOfMonth) {
          allDateTime.push(dayjs.tz(currentDate).set('hour', timeStart[0]).set('minute', timeStart[1]));
          allDateTime.push(dayjs.tz(currentDate).set('hour', timeEnd[0]).set('minute', timeEnd[1]));
        }
      }

      currentDate = currentDate.add(1, 'day');
    }

    if (type === EGenType.DAY) {
      allDateTime.push(dayjs.tz(currentDate).set('hour', timeStart[0]).set('minute', timeStart[1]));
      allDateTime.push(dayjs.tz(currentDate).set('hour', timeEnd[0]).set('minute', timeEnd[1]));
    }
  });

  allDateTime = allDateTime.sort((a, b) => a.diff(b));
  allDateTime.forEach((v) => console.log(v.format('YYYY-MM-DD HH:mm:ss')));
  return _.chunk(allDateTime, 2);
};
