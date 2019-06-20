import * as CSV from 'csvtojson';
import * as fs from 'fs';
import { AppError } from '../models/AppError';
import { Logger } from '../utilities/logger';

export class DataConvertor {
  private log(message): void {
    Logger.log('[DC]', message);
  }

  private normalizeFirstRow(data: string): string {
    return data.replace(new RegExp('com.samsung.health.*\n', 'g'), '');
  }

  private isValidData(dataSample: object, keys: string[]): boolean {
    if (!dataSample) {
      return false;
    }

    const objKeys = Object.keys(dataSample);

    return keys.every((k: string) => objKeys.indexOf(k) !== -1);
  }

  private reduceKeys<T>(keys: string[], objArray: object[]): T[] {
    if (this.isValidData(objArray[0], keys) === false) {
      throw new AppError('Couldnt parse data, make sure your data has these values: ' + keys.join(','));
    }

    const toReducedObject = (record: object, result: T, k: string): T => {
      if (keys.indexOf(k) !== -1) {
        result[k] = record[k];
      }

      return result;
    };

    const removeUnusedKeys = (record: object): T => {
      return Object.keys(record).reduce(toReducedObject.bind(this, record), {} as T);
    };

    return objArray.map(removeUnusedKeys);
  }

  private readFile(path: string): Promise<string> {
    return new Promise((resolve: Function, reject: Function) => {
      fs.readFile(path, 'utf8', (err: Error, data: string): void => {
        if (err) {
          return reject(err);
        }

        resolve(data);
      });
    });
  }

  private parseStringCSV(data: string): Promise<object[]> {
    const normalizedData = this.normalizeFirstRow(data);

    return new Promise((resolve: Function, reject: Function) => {
      CSV()
        .fromString(normalizedData)
        .then(
          resolve as any,
          reject as any
        );
    });
  }

  public convertFileToJson<T>(path: string, keys: string[]): Promise<T[]> {
    this.log('Reading ' + path);

    return this.readFile(path)
      .then(this.parseStringCSV.bind(this))
      .then(this.reduceKeys.bind(this, keys)) as any;
  }
}
