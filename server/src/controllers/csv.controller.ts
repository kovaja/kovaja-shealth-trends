import { Request } from 'express';
import * as fs from 'fs';
import { DataConvertor } from '../data-processing/DataConvertor';
import { FileUtility } from '../utilities/file.utility';

export class CSVController {
  private convertor: DataConvertor;

  constructor() {
    this.convertor = new DataConvertor();
  }

  private onFileUploadFinished(csvPath: string, data: object): Promise<object> {
    const jsonPath = csvPath.replace('.csv', '.json');

    return FileUtility.writeJSON(jsonPath, data)
      .then(() => FileUtility.removeFile(csvPath))
      .then(() => data);
  }

  public handleFileStream(req: Request, resolve: Function, reject: Function): void {
    const userKey = req.params['key'];

    const filePath = FileUtility.getFilePath(userKey, 'csv');
    const writeStream = fs.createWriteStream(filePath);

    req.pipe(writeStream);

    writeStream.on('finish', (): void => {
      this.convertor
        .convertFileToJson<object>(filePath)
        .then(this.onFileUploadFinished.bind(this, filePath))
        .then((data: object): void => resolve(data));
    });

    writeStream.on('error', (err: Error): void => reject(err));
  }
}