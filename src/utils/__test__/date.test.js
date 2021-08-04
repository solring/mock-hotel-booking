import dayjs from 'dayjs';
import { serializeDate, parseDate, parseJSDate, diffDate } from '../dates';

const testDay = dayjs(new Date(2010, 3, 5));

test('serializeDate', () => {
  // normal object
  let parsed = serializeDate(testDay);
  expect(parsed).toEqual('2010-04-05');

  // undefined arg
  parsed = serializeDate();
  expect(parsed).toEqual('');
});

test('parseDate', () => {
  // valid str
  let day = parseDate('2020-04-30');
  expect(day.year()).toBe(2020);
  expect(day.month()).toBe(3); //Months are zero indexed
  expect(day.date()).toBe(30);

  // invalid str
  day = parseDate('2030-00-00');
  expect(day).toBeNull();

  day = parseDate('2030-10/30');
  expect(day).toBeNull();

  // undefined arg
  day = parseDate();
  expect(day.isValid()).toBe(true);
});

test('parseJSDate', () => {
  let day = new Date();
  expect(parseJSDate(day).isValid()).toBe(true);
});

test('diffDate', () => {
  // strings as args
  let d1 = '2020-03-03';
  let d2 = '2020-04-01';

  expect(diffDate(d1, d2)).toBe(29);
  expect(diffDate(d2, d1)).toBe(-29);

  // native Date as args
  d1 = new Date(2018, 8, 18);
  d2 = new Date(2018, 8, 28);
  expect(diffDate(d1, d2)).toBe(10);
  expect(diffDate(d2, d1)).toBe(-10);
})





