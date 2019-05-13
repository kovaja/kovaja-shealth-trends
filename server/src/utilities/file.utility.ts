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

      const onDirCreated = (err: Error): void => {
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

  public static removeFile(path): Promise<void> {
    const removeFilePromise = (resolve, reject): void => {

      const onFileRemoved = (err: Error): void => {
        if (err) {
          reject(err);
          return;
        }

        resolve();
      };

      fs.unlink(path, onFileRemoved);
    };

    return new Promise(removeFilePromise);
  }

  public static writeJSON(path, data): Promise<void> {
    const createFile = (resolve, reject): void => {

      const onFileWritten = (err: Error): void => {
        if (err) {
          reject(err);
          return;
        }

        resolve();
      };

      fs.writeFile(path, JSON.stringify(data, undefined, 2), 'utf8', onFileWritten);
    };

    return new Promise(createFile);
  }
}