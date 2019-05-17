import { IHeartRateInputData, IHeartRateOutputData } from '../../../shared/api.schemas';

export class HeartRateConvertor {
  private static convertRate(rate: string): number {
    return +rate;
  }

  public static test(rawData: IHeartRateInputData[]): IHeartRateOutputData {
    const totalRate = rawData.reduce((totalRate: number, obj: IHeartRateInputData): number => {
      return totalRate += this.convertRate(obj.heart_rate);
    }, 0);

    const avg = (totalRate / rawData.length);


    return {
      averageRate: Math.floor(avg * 100) / 100,
      weekDayAverage: {
        title: 'Average for week day',
        dataset: []
      }
    };
  }
}