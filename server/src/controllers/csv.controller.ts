import { Request, Response } from 'express';
import { DataConvertor } from '../data-processing/DataConvertor';
import { FileUtility } from '../utilities/file.utility';

export class CSVController {
  private convertor;

  constructor() {
    this.convertor = new DataConvertor();
  }

  public handleFileStream(req: Request, res: Response): void {
    if (req.header('Content-Type') !== 'application/octet-stream') {
      res.status(400).send({ error: 'Wrong content type, octet-stream expected' });
      return;
    }

    const filename = FileUtility.writeFile(req.body, 'csv');

    this.convertor.convertFileToJson(filename)
    .then((json: object) => {
      res.status(200).send(json);
    });
  }
}