import * as fs from 'fs';
import { AppError } from '../models/AppError';
import { Logger } from '../utilities/logger';

const DEFAULT_DELIMITER = ',';

interface IHeaderKeys {
  [key: string]: number; // header name: index in array of data (row.split(,)[index])
}

export class DataConvertor {
  private delimiter: string;

  constructor(delimiter?) {
    this.delimiter = delimiter || DEFAULT_DELIMITER;
  }

  private log(message): void {
    Logger.log('[DC]', message);
  }

  private readCSVRow(row: string, keys: IHeaderKeys): { [key: string]: any } {
    const data = row.split(this.delimiter);

    const json = {};

    Object.keys(keys).forEach(key => {
      const header = key;
      const value = data[keys[key]];

      json[header] = value;
    });

    return json;
  }

  private matchKeysAndHeaders(headers: string[], requiredKeys: string[]): IHeaderKeys {
    const matchKey = (keysWithIndexes: IHeaderKeys, key: string): IHeaderKeys => {
      const index = headers.indexOf(key);

      if (index === -1) {
        throw new AppError('Wrong data format. Make sure your file has all of these headers: ' + headers.join(','));
      }

      keysWithIndexes[key] = index;

      return keysWithIndexes;
    };

    return requiredKeys.reduce(matchKey, {});
  }

  private convertToJson<T>(csvString: string, keys: string[]): T[] {
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
    const matchedKeys = this.matchKeysAndHeaders(headers, keys);

    rows.splice(0, 1);

    // Convert
    const jsonArray = [];

    // rows.length - 1 last row is empty string (probably new line)
    for (let i = 0; i < rows.length - 1; i += 1) {
      const rowObject = this.readCSVRow(rows[i], matchedKeys);

      jsonArray.push(rowObject);
    }

    return jsonArray;
  }

  public convertFileToJson<T>(path: string, keys: string[]): Promise<T[]> {
    this.log('Reading ' + path);

    return new Promise((resolve: Function, reject: Function): void => {
      fs.readFile(path, 'utf8', (err: Error, data: string) => {
        if (err) {
          return reject(err);
        }

        resolve(this.convertToJson<T>(data, keys));
      });
    });
  }
}
