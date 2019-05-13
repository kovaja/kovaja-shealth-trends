import * as fs from 'fs';
import { Logger } from '../utilities/logger';

const DEFAULT_DELIMITER = ',';

export class DataConvertor {
  private delimiter: string;

  constructor(delimiter?) {
    this.delimiter = delimiter || DEFAULT_DELIMITER;
  }

  private log(message): void {
    Logger.log('[DC]', message);
  }

  private readCSVRow(row: string, headers: string[]): { [key: string]: any } {
    const data = row.split(this.delimiter);

    const json = {};

    for (let i = 0; i < headers.length; i += 1) {
      json[headers[i]] = data[i];
    }

    return json;
  }

  private convertToJson(csvString: string): { [key: string]: any }[] {
    if (typeof csvString !== 'string' || csvString.length === 0) {
      throw new Error('[DC]: Not a CSV string');
    }

    const rows = csvString.split('\n');

    if (rows[0].includes('com.samsung.health')) {
      this.log('Skipping first row');

      rows.splice(0, 1);
    }

    // Extract headers
    const headers = rows[0].split(this.delimiter);
    rows.splice(0, 1);

    // Convert
    const jsonArray = [];

    for (let i = 0; i < rows.length; i += 1) {
      const dataObject = this.readCSVRow(rows[i], headers);
      jsonArray.push(dataObject);
    }

    return jsonArray;
  }

  public convertFileToJson<T>(path: string): Promise<T> {
    this.log('Reading ' + path);

    return new Promise((resolve: Function, reject: Function): void => {
      fs.readFile(path, 'utf8', (err: Error, data: string) => {
        if (err) {
          return reject(err);
        }

        resolve(this.convertToJson(data));
      });
    });
  }
}
