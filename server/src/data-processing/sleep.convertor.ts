import { ISleepInputData, IWeekDayOutputData, IWeekDayRecord } from '../../../shared/api.schemas';
import { Logger } from '../utilities/logger';
import { CommonConvertor } from './common.convertor';

export class SleepConvertor {
  private static computeSleptHours(start: Date, end: Date): number {
    return (end.getTime() - start.getTime()) / (60 * 60 * 1000);
  }

  public static processData(rawData: ISleepInputData[]): IWeekDayOutputData {
    let totalHrs = 0;

    const days = {
      'Mo': [],
      'Tu': [],
      'We': [],
      'Th': [],
      'Fr': [],
      'Sa': [],
      'Su': []
    };

    rawData.forEach((record: ISleepInputData): void => {
      const start = CommonConvertor.convertStringToDate(record.start_time);
      const end =  CommonConvertor.convertStringToDate(record.create_time);
      const day = CommonConvertor.mapDateToDay(end);

      const hrs = this.computeSleptHours(start, end);


      if (!days[day]) {

        Logger.log('invalid record', record);

      } else {

        days[day].push(+hrs.toPrecision(2));
      }

      totalHrs += hrs;
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
      averageRate: CommonConvertor.getAverage(totalHrs, rawData.length),
      weekDay: dataset,
      yDomain: [0, 10]
    };
  }
}