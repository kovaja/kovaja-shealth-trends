import { Request, Response } from 'express';
import * as fs from 'fs';
import { DataConvertor } from '../data-processing/DataConvertor';
// import { DataConvertor } from '../data-processing/DataConvertor';
import { CommonUtility } from '../utilities/common.utility';
import { FileUtility } from '../utilities/file.utility';
import { Logger } from '../utilities/logger';

export class CSVController {
  private convertor: DataConvertor;

  constructor() {
    this.convertor = new DataConvertor();
  }

  private onFileUploadError(res: Response, err: Error | string): void {
    Logger.error(err);
    res.status(400).send({ error: 'Upload failed' });
  }

  private onConvertFinished(res: Response, data: object): void {
    res.status(200).send(data);
  }

  private onWriteFinished(res: Response, path: string): void {
    this.convertor.convertFileToJson(path)
    .then(this.onConvertFinished.bind(this, res))
    .catch(this.onFileUploadError.bind(this, res));
  }

  public handleFileStream(req: Request, res: Response): void {
    if (CommonUtility.isFileStreamRequest(req) === false) {
      this.onFileUploadError(res, 'Wrong content type');
      return;
    }

    const userKey = req.params['key'];

    const filePath = FileUtility.getFilePath(userKey, 'csv');
    const writeStream = fs.createWriteStream(filePath);

    req.pipe(writeStream);

    writeStream.on('finish', this.onWriteFinished.bind(this, res, filePath));
    writeStream.on('error', this.onFileUploadError.bind(this, res));
  }
}