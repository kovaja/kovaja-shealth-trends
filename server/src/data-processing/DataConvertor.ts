import * as CSV from 'csvtojson';
import * as fs from 'fs';
import { Logger } from '../utilities/logger';

export class DataConvertor {
  private log(message): void {
    Logger.log('[DC]', message);
  }

  private normalizeFirstRow(data: string): string {
    return data.replace(new RegExp('com.samsung.health.*\n', 'g'), '');
  }

  private reduceKeys<T>(keys: string[], objArray: object[]): T[] {
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
          .then(o => this.reduceKeys<T>(keys, o))
          .then(res => resolve(res));
      });
    });
  }
}
