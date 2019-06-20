export interface IUserKeyData {
  userKey: number;
}

export interface IHeartRateInputData {
  heart_rate: string,
  create_time: string,
  time_offset: string
}

export interface IWeekDayRecord {
  day: 'Mo' | 'Tu' | 'We' | 'Th' | 'Fr' | 'Sa' | 'Su';
  average: number;
  median: number;
}

export interface IHeartRateOutputData {
  numberOfRecords: number;
  averageRate: number;
  weekDay: IWeekDayRecord[];
}

export interface IErrorResponse {
  error: string;
}
