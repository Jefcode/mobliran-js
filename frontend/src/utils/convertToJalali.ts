import moment from 'jalali-moment';

export default function convertToJalali(date: Date | number): string {
  return moment(date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
}
