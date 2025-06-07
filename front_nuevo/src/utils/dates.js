import { format, differenceInDays, isAfter, isBefore, isEqual } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatDate = (date) => {
  return format(date, 'dd/MM/yyyy', { locale: es });
};

export const formatDateLong = (date) => {
  return format(date, "dd 'de' MMMM 'de' yyyy", { locale: es });
};

export const formatDateShort = (date) => {
  return format(date, 'dd MMM', { locale: es });
};

export const getDaysDifference = (start, end) => {
  return differenceInDays(end, start);
};

export const isDateInRange = (date, startDate, endDate) => {
  return (isEqual(date, startDate) || isAfter(date, startDate)) && 
         (isEqual(date, endDate) || isBefore(date, endDate));
};

export const isSameDay = (date1, date2) => {
  return format(date1, 'yyyy-MM-dd') === format(date2, 'yyyy-MM-dd');
};

export const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};