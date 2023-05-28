/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';
import timezone from 'dayjs/plugin/timezone';
import updateLocale from 'dayjs/plugin/updateLocale';
import utc from 'dayjs/plugin/utc';
dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/bangkok');
dayjs.extend(isBetween);
dayjs.extend(updateLocale);

declare const global;
global.dayjs = dayjs;

dayjs.updateLocale('en', {
  weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
});

dayjs.updateLocale('th', {
  weekdays: ['วันอาทิตย์', 'วันจันทร์', 'วันอังคาร', 'วันพุธ', 'วันพฤหัสบดี', 'วันศุกร์', 'วันเสาร์'],
});
