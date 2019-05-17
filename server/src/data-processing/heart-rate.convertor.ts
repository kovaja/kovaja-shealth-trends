import { IHeartRateInputData, IHeartRateOutputData, IWeekDayAvgRecord } from '../../../shared/api.schemas';
import { Logger } from '../utilities/logger';

export class HeartRateConvertor {
  private static getAverage(total: number, num: number): number {
    return Math.floor((total / num) * 100) / 100;
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
      'Mo': { total: 0, number: 0 },
      'Tu': { total: 0, number: 0 },
      'We': { total: 0, number: 0 },
      'Th': { total: 0, number: 0 },
      'Fr': { total: 0, number: 0 },
      'Sa': { total: 0, number: 0 },
      'Su': { total: 0, number: 0 }
    };

    rawData.forEach((record: IHeartRateInputData): void => {
      const rate = this.convertRate(record.heart_rate);
      const day = this.mapDateToDay(record.create_time);

      if (!days[day]) {

        Logger.log('invalid record', record);

      } else {

        days[day].total += rate;
        days[day].number += 1;

      }

      totalRate += rate;
    });

    const dataset = Object.keys(days).map((dayName: string): IWeekDayAvgRecord => {
      const dayData = days[dayName];
      const avg = this.getAverage(dayData.total, dayData.number);

      return {
        day: dayName as any,
        value: avg
      };
    });

    return {
      numberOfRecords: rawData.length,
      averageRate: this.getAverage(totalRate, rawData.length),
      weekDayAverage: {
        title: 'Average for week day',
        dataset: dataset
      }
    };
  }
}