import { Request, Response } from 'express';
import * as fs from 'fs';
// import { DataConvertor } from '../data-processing/DataConvertor';
import { CommonUtility } from '../utilities/common.utility';
import { FileUtility } from '../utilities/file.utility';

export class CSVController {
  // private convertor; // TODO: convert csv to json and send to client

  constructor() {
    // this.convertor = new DataConvertor();
  }

  private onFileUploadError(res: Response, err: Error | string): void {
    console.log(err);

    res.status(400).send({ error: 'Upload failed' });
  }

  private onWriteFinished(res: Response): void {
    console.log('Writing completed !');

    res.status(200).send({ok: 'Writing completed !'});
  }

  public handleFileStream(req: Request, res: Response): void {
    if (CommonUtility.isFileStreamRequest(req) === false) {
      this.onFileUploadError(res, 'Wrong content type');
      return;
    }

    const filename = FileUtility.getFilename('csv');
    const writeStream = fs.createWriteStream(filename);

    req.pipe(writeStream);

    writeStream.on('finish', this.onWriteFinished.bind(this, res));
    writeStream.on('error', this.onFileUploadError.bind(this, res));
  }
}