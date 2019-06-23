import { FileType } from './enumeration';

// When keys are updated update api schema
export const SupportedFileTypes = {
  // all of it: end_time,heart_rate,binning_data,start_time,heart_beat_count,update_time,deviceuuid,max,min,pkg_name,time_offset,custom,comment,datauuid,create_time
  [FileType.HeartRate]: ['heart_rate', 'create_time', 'time_offset'],
  [FileType.Sleep]: [ 'start_time', 'create_time']
};