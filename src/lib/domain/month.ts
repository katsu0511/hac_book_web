import { Month, MONTHS } from '@/constants/Month';
import dayjs, { Dayjs } from 'dayjs';

export const getCurrentMonth = (): Month => {
  const nowDate = new Date();
  return MONTHS[nowDate.getMonth()];
};

export const getFirstDayOfCurrentMonth = (): Dayjs => {
  return dayjs().startOf('month');
}

export const getToday = (): Dayjs => {
  return dayjs();
}
