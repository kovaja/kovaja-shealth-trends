import { IHeartRateInputData, IHeartRateOutputData, IWeekDayRecord } from '../../../shared/api.schemas';
import { Logger } from '../utilities/logger';

export class HeartRateConvertor {
  private static getAverage(total: number, num: number): number {
    return Math.floor((total / num) * 100) / 100;
  }

  private static getAverageFromArray(values: number[]): number {
    const sum = values.reduce((s, c) => s += c);
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

  private static mapDateToDay(dateString: string): string {
    const dayNum = new Date(dateString).getDay();

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