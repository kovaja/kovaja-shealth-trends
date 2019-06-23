import { IHeartRateInputData, IHeartRateOutputData, IWeekDayRecord } from '../../../shared/api.schemas';
import { Logger } from '../utilities/logger';
import { CommonConvertor } from './common.convertor';

export class HeartRateConvertor {
  private static convertRate(rate: string): number {
    return +rate;
  }

  private static mapDateToDay(dateString: string): string {
    const date = CommonConvertor.convertStringToDate(dateString);
    return CommonConvertor.mapDateToDay(date);
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
        average: CommonConvertor.getAverageFromArray(dayData),
        median: CommonConvertor.getMedianFromArray(dayData)
      };
    });

    return {
      numberOfRecords: rawData.length,
      averageRate: CommonConvertor.getAverage(totalRate, rawData.length),
      weekDay: dataset
    };
  }
}