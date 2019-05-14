import Axios, { AxiosRequestConfig } from 'axios';
import { FileType } from '../../../shared/api.schemas';

export default class FileUploadService {

  public static uploadFile(
    file: File,
    type: string,
    userKey: number,
    progressCallback: (event: ProgressEvent) => void
  ): Promise<FileType> {

    const uploadUrl = '/api/csv/upload/' + type + '/' + userKey;

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
        // averageRate: Math.floor(avg * 100) / 100,
        // numberOfRecords: rawData.length
        alert('Average rate ' + r.data.averageRate + ' from ' + r.data.numberOfRecords + ' records');
        return r.data;
      });
  }
}
