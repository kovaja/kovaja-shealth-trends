import * as CSV from 'csvtojson';
import CSVError from 'csvtojson/v2/CSVError';
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

  public convertFileToJson<T>(path: string, keys: string[]): Promise<T[]> {
    this.log('Reading ' + path);

    return new Promise((resolve: Function, reject: Function): void => {
      fs.readFile(path, 'utf8', (err: Error, data: string) => {
        if (err) {
          return reject(err);
        }


        CSV().fromString(this.normalizeFirstRow(data))
          .subscribe(
            (arrayOfDataObjects) => resolve(this.reduceKeys<T>(keys, arrayOfDataObjects)),
            reject as (err: CSVError) => void
          );
      });
    });
  }
}
