import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import { AppConfig } from '../app.config';

export class FileUtility {
  public static getFilePath(userKey: string, extension: string): string {
    const currentTS = new Date().getTime();

    return path.resolve(AppConfig.FILE_STORAGE_PATH + '/' + userKey + '/test-file-' + currentTS + '.' + extension);
  }

  public static initializeFileFolder(): void {
    const path = AppConfig.FILE_STORAGE_PATH;

    rimraf.sync(path);
    fs.mkdirSync(path);
  }

  public static initializeUserFolder(key: number): Promise<void> {
    const createUserFolder = (resolve, reject): void => {

      const onDirCreated = (err: Error) => {
        if (err) {
          reject(err);
          return;
        }

        resolve();
      };

      fs.mkdir(AppConfig.FILE_STORAGE_PATH + '/' + key, onDirCreated);
    };

    return new Promise(createUserFolder);
  }
}