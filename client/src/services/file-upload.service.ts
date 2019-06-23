import Axios, { AxiosRequestConfig } from 'axios';
import { IHeartRateOutputData } from '../../../shared/api.schemas';

export default class FileUploadService {
  private static getUploadUrl(userKey: number): string {
    return `/api/csv/upload/${userKey}`;
  }

  public static uploadHeartRate(
    file: File,
    userKey: number,
    progressCallback: (event: ProgressEvent) => void
  ): Promise<IHeartRateOutputData> {

    const uploadUrl = this.getUploadUrl(userKey) + '/heartRate';

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
}
