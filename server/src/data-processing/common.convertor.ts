import { AppError } from '../models/AppError';

export class CommonConvertor {

  /**
   * From android: 2019-03-09 18:22:14.201
   * From ios: "13/02/2019, 19:15:18"
   */
  public static convertStringToDate(dateString: string): Date {
    let date: Date;

    if (dateString.includes('/')) {
      const parts = dateString.split(',');
      date = new Date(parts[0].split('/').reverse().join('-') + parts[1]);
    } else {
      date = new Date(dateString);
    }

    if (isNaN(date.getTime())) {
      throw new AppError('Invalid date ' + dateString);
    }

    return date;
  }

  public static mapDateToDay(date: Date): string {
    const dayNum = date.getDay();

    switch (dayNum) {
      case 1:
        return 'Mo';
      case 2:
        return 'Tu';
      case 3:
        return 'We';
      case 4:
        return 'Th';
      case 5:
        return 'Fr';
      case 6:
        return 'Sa';
      case 0:
        return 'Su';
      default:
        return '??';
    }
  }

  public static getAverage(total: number, num: number): number {
    return Math.floor((total / num) * 100) / 100;
  }

  public static getAverageFromArray(values: number[]): number {
    const sum = values.reduce((s, c) => s += c, 0);
    return this.getAverage(sum, values.length);
  }

  public static getMedianFromArray(values: number[]): number {
    values.sort();

    let index: number;

    if (values.length % 2 === 0) { // even
      index = values.length / 2;
      return (values[index] + values[index + 1]) / 2;
    }

    return values[Math.ceil(values.length / 2)];
  }
}