import { Request, Response } from 'express';
import { DataConvertor } from '../data-processing/DataConvertor';

export class CSVController {
  private convertor;

  constructor() {
    this.convertor = new DataConvertor();
  }

  public processBase64Csv(req: Request, res: Response): void {
    let data = req.body.data;

    if (data.includes('base64,')) {
      data = data.replace('base64,', '');
      console.log('Replaced');
    }

    const csvString = Buffer.from(data, 'base64').toString('ascii');

    const json = this.convertor.convertBase64CSVStringToJson(csvString);

    res.status(200).send({
      status: 'ok',
      data: json
    });
  }
}