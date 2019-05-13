import Axios, { AxiosRequestConfig } from 'axios';

export default class FileUploadService {

  public static uploadFile(
    file: File,
    userKey: number,
    progressCallback: (event: ProgressEvent) => void
  ): Promise<any> {

    const uploadUrl =  '/api/csv/upload/' + userKey;

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
        console.log(r.data);
      });
  }
}
