import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DAYJS_PARSE_FORMATE } from './constants';

dayjs.extend(customParseFormat);

function serializeDate(date) {
  if (!date) return "";
  return date.format(DAYJS_PARSE_FORMATE);
}

function parseDate(str) {
  if (!str) return dayjs(); // default is now

  let day = dayjs(str, DAYJS_PARSE_FORMATE, true);

  if(day.isValid()) return day;
  else return null;
}

function parseJSDate(date) {
  return dayjs(date)
}

function diffDate(date1, date2) {
  let d1 = dayjs(date1);
  let d2 = dayjs(date2);
  return d2.diff(d1, 'day');
}

export { serializeDate, parseDate, parseJSDate, diffDate };