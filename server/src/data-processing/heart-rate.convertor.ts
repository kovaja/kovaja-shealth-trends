import { IHeartRateInputData, IHeartRateOutputData, IWeekDayRecord } from '../../../shared/api.schemas';
import { AppError } from '../models/AppError';
import { Logger } from '../utilities/logger';

export class HeartRateConvertor {
  private static getAverage(total: number, num: number): number {
    return Math.floor((total / num) * 100) / 100;
  }

  private static getAverageFromArray(values: number[]): number {
    const sum = values.reduce((s, c) => s += c, 0);
    return this.getAverage(sum, values.length);
  }

  private static getMedianFromArray(values: number[]): number {
    values.sort();

    let index: number;

    if (values.length % 2 === 0) { // even
      index = values.length / 2;
      return (values[index] + values[index + 1]) / 2;
    }

    return values[Math.ceil(values.length / 2)];
  }

  private static convertRate(rate: string): number {
    return +rate;
  }

  /**
   * From android: 2019-03-09 18:22:14.201
   * From ios: "13/02/2019, 19:15:18"
   */
  private static mapDateToDay(dateString: string): string {
    let date: Date;

    if (dateString.includes('/')) {
      const parts = dateString.split(',');
      date = new Date(parts[0].split('/').reverse().join('-') + parts[1]);
    } else {
      date = new Date(dateString);
    }

    const dayNum = date.getDay();

    if (isNaN(dayNum)) {
      throw new AppError('Invalid date ' + dateString);
    }

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

  public static processData(rawData: IHeartRateInputData[]): IHeartRateOutputData {
    let totalRate = 0;

    const days = {
      'Mo': [],
      'Tu': [],
      'We': [],
      'Th': [],
      'Fr': [],
      'Sa': [],
      'Su': []
    };

    rawData.forEach((record: IHeartRateInputData): void => {
      const rate = this.convertRate(record.heart_rate);
      const day = this.mapDateToDay(record.create_time);

      if (!days[day]) {

        Logger.log('invalid record', record);

      } else {

        days[day].push(rate);
      }

      totalRate += rate;
    });

    const dataset = Object.keys(days).map((dayName: string): IWeekDayRecord => {
      const dayData = days[dayName];

      return {
        day: dayName as any,
        average: this.getAverageFromArray(dayData),
        median: this.getMedianFromArray(dayData)
      };
    });

    return {
      numberOfRecords: rawData.length,
      averageRate: this.getAverage(totalRate, rawData.length),
      weekDay: dataset
    };
  }
}