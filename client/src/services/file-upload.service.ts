import Axios, { AxiosRequestConfig } from 'axios';
import { IWeekDayOutputData } from '../../../shared/api.schemas';

export default class FileUploadService {
  private static getUploadUrl(userKey: number, type: string): string {
    return `/api/csv/upload/${userKey}/${type}`;
  }

  private static upload<T>(
    file: File,
    userKey: number,
    progressCallback: (event: ProgressEvent) => void,
    type: string
  ): Promise<IWeekDayOutputData> {
    const uploadUrl = this.getUploadUrl(userKey, type);

    const requestConfig: AxiosRequestConfig = {
      data: file,
      headers: {
        'Content-Type': 'application/octet-stream'
      },
      onUploadProgress: progressCallback,
      method: 'POST',
      url: uploadUrl
    };

    return Axios(requestConfig)
      .then((r) => {
        return r.data;
      });
  }

  public static uploadHeartRate(
    file: File,
    userKey: number,
    progressCallback: (event: ProgressEvent) => void
  ): Promise<IWeekDayOutputData> {
    return this.upload(
      file,
      userKey,
      progressCallback,
      'heartRate'
    );
  }

  public static uploadSleep(
    file: File,
    userKey: number,
    progressCallback: (event: ProgressEvent) => void
  ): Promise<IWeekDayOutputData> {
    return this.upload(
      file,
      userKey,
      progressCallback,
      'sleep'
    );
  }
}
