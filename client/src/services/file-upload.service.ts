import Axios, { AxiosRequestConfig } from 'axios';
import { IHeartRateOutputData } from '../../../shared/api.schemas';

export default class FileUploadService {

  public static uploadHeartRate(
    file: File,
    userKey: number,
    progressCallback: (event: ProgressEvent) => void
  ): Promise<IHeartRateOutputData> {

    const uploadUrl = '/api/csv/upload/heartRate/' + userKey;

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
        alert('Average rate ' + r.data.averageRate + ' from ' + r.data.numberOfRecords + ' records');
        return r.data;
      });
  }
}
