import { IHeartRateData } from '../../../shared/api.schemas';

interface HeartRateResponse {
  averageRate: number;
  numberOfRecords: number;
}

export class HeartRateConvertor {
  private static convertRate(rate: string): number {
    return +rate;
  }

  public static test(rawData: IHeartRateData[]): HeartRateResponse {
    const totalRate = rawData.reduce((totalRate: number, obj: IHeartRateData): number => {
      return totalRate += this.convertRate(obj.heart_rate);
    }, 0);

    const avg = (totalRate / rawData.length);


    return {
      averageRate: Math.floor(avg * 100) / 100,
      numberOfRecords: rawData.length
    };
  }
}