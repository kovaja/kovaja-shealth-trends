import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { appConfig } from '../app.config';
import { DataConvertor } from '../data-processing/DataConvertor';

export class CSVController {
  private convertor;

  constructor() {
    this.convertor = new DataConvertor();
  }

  private writeFile(data: any, filename: string): void {
    const writeStream = fs.createWriteStream(filename);
    const buffer = Buffer.from(data);

    writeStream.write(buffer);
    writeStream.end();
  }

  private getFilename(extension: string): string {
    const currentTS = new Date().getTime();

    return path.resolve(appConfig.FILE_STORAGE_PATH + '/test-file-' + currentTS + '.' + extension);
  }

  public handleFileStream(req: Request, res: Response): void {
    if (req.header('Content-Type') !== 'application/octet-stream') {
      res.status(400).send({ error: 'Wrong content type, octet-stream expected' });
      return;
    }

    const filename = this.getFilename('csv');
    this.writeFile(req.body, filename);

    this.convertor.convertFileToJson(filename)
    .then((json: object) => {
      res.status(200).send(json);
    });
  }
}