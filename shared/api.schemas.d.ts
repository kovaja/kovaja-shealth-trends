export interface IUserKeyData {
  userKey: number;
}

export interface IHeartRateInputData {
  heart_rate: string,
  create_time: string,
  time_offset: string
}

export interface IWeekDayAvgRecord {
  day: 'Mo' | 'Tu' | 'We' | 'Th' | 'Fr' | 'Sa' | 'Su';
  value: number;
}

export interface IWeekDayAverageData {
  title: string;
  dataset: IWeekDayAvgRecord[];
}

export interface IHeartRateOutputData {
  averageRate: number;
  weekDayAverage: IWeekDayAverageData
}
