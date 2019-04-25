import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import { AppConfig } from '../app.config';

export class FileUtility {
  public static getFilename(extension: string): string {
    const currentTS = new Date().getTime();

    return path.resolve(AppConfig.FILE_STORAGE_PATH + '/test-file-' + currentTS + '.' + extension);
  }

  public static initializeFileFolder(): void {
    const path = AppConfig.FILE_STORAGE_PATH;

    rimraf.sync(path);
    fs.mkdirSync(path);
  }
}