export interface IUserKeyData {
  userKey: number;
}

export interface IHeartRateInputData {
  heart_rate: string;
  create_time: string;
  time_offset: string;
}

export interface ISleepInputData {
  start_time: string;
  create_time: string;
}

export interface IWeekDayRecord {
  day: 'Mo' | 'Tu' | 'We' | 'Th' | 'Fr' | 'Sa' | 'Su';
  average: number;
  median: number;
}

export interface IWeekDayOutputData {
  numberOfRecords: number;
  averageRate: number;
  weekDay: IWeekDayRecord[];
  yDomain: number[];
}

export interface IErrorResponse {
  error: string;
}