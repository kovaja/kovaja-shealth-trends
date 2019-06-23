import { Request } from 'express';
import * as fs from 'fs';
import { IHeartRateInputData, ISleepInputData } from '../../../shared/api.schemas';
import { FileType } from '../constants/enumeration';
import { SupportedFileTypes } from '../constants/file-types';
import { DataConvertor } from '../data-processing/DataConvertor';
import { HeartRateConvertor } from '../data-processing/heart-rate.convertor';
import { SleepConvertor } from '../data-processing/sleep.convertor';
import { FileUtility } from '../utilities/file.utility';

export class CSVController {
  private convertor: DataConvertor;

  constructor() {
    this.convertor = new DataConvertor();
  }

  private onFileUploadFinished(csvPath: string, data: FileType): Promise<FileType> {
    const jsonPath = csvPath.replace('.csv', '.json');

    return FileUtility.writeJSON(jsonPath, data)
      .then(() => FileUtility.removeFile(csvPath))
      .then(() => data);
  }

  public handleHeartRateStream(req: Request, resolve: Function, reject: Function): void {
    const userKey = req.params['key'];
    const type = FileType.HeartRate;

    const filePath = FileUtility.getFilePath(type, userKey, 'csv');
    const writeStream = fs.createWriteStream(filePath);

    req.pipe(writeStream);

    writeStream.on('finish', (): void => {
      this.convertor
        .convertFileToJson(filePath, SupportedFileTypes[type])
        .then(this.onFileUploadFinished.bind(this, filePath))
        .then((data: IHeartRateInputData[]): void => resolve(HeartRateConvertor.processData(data)))
        .catch(reject as any);
    });

    writeStream.on('error', (err: Error): void => reject(err));
  }


  public handleSleepStream(req: Request, resolve: Function, reject: Function): void {
    const userKey = req.params['key'];
    const type = FileType.Sleep;

    const filePath = FileUtility.getFilePath(type, userKey, 'csv');
    const writeStream = fs.createWriteStream(filePath);

    req.pipe(writeStream);

    writeStream.on('finish', (): void => {
      this.convertor
        .convertFileToJson(filePath, SupportedFileTypes[type])
        .then(this.onFileUploadFinished.bind(this, filePath))
        .then((data: ISleepInputData[]): void => resolve(SleepConvertor.processData(data)))
        .catch(reject as any);
    });

    writeStream.on('error', (err: Error): void => reject(err));
  }
}