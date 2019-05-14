import Axios, { AxiosRequestConfig } from 'axios';

export default class FileUploadService {

  public static uploadFile(
    file: File,
    type: string,
    userKey: number,
    progressCallback: (event: ProgressEvent) => void
  ): Promise<any> {

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
        // tslint:disable-next-line:no-console
        console.log(r.data);
      });
  }
}
