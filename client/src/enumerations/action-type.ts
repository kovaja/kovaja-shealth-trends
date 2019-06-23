export enum ActionType {
  UserKeyReceived = 'USER_KEY_RECEIVED',
  UserKeyFetch = 'USER_KEY_FETCH',
  UserKeyRemove = 'USER_KEY_REMOVE',
  HeartRateDataUploadStart = 'HEART_RATE_DATA_UPLOAD_START',
  HeartRateDataUploadFinished = 'HEART_RATE_DATA_UPLOAD_FINISHED',
  HeartRateDataUploadError = 'HEART_RATE_DATA_UPLOAD_ERROR',
  HeartRateDataReset = 'HEART_RATE_DATA_RESET',
  SleepDataUploadStart = 'SLEEP_DATA_UPLOAD_START',
  SleepDataUploadFinished = 'SLEEP_DATA_UPLOAD_FINISHED',
  SleepDataUploadError = 'SLEEP_DATA_UPLOAD_ERROR',
  SleepDataReset = 'SLEEP_DATA_RESET',
  ActiveViewChange = 'ACTIVE_VIEW_CHANGE'
}
