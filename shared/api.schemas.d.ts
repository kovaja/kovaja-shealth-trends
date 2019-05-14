export interface IUserKeyData {
  userKey: number;
}

export interface IHeartRateData {
  heart_rate: string,
  create_time: string,
  time_offset: string
}

type FileType = IHeartRateData; // | IAnotherFileType;
