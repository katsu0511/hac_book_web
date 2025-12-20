import { Month, MONTHS } from '@/constants/Month';

export const getCurrentMonth = (): Month => {
  const nowDate = new Date();
  return MONTHS[nowDate.getMonth()];
};
