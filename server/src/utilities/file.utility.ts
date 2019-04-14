import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import { appConfig } from '../app.config';

export class FileUtility {
  private static getFilename(extension: string): string {
    const currentTS = new Date().getTime();

    return path.resolve(appConfig.FILE_STORAGE_PATH + '/test-file-' + currentTS + '.' + extension);
  }

  public static initializeFileFolder(): void {
    const path = appConfig.FILE_STORAGE_PATH;

    rimraf.sync(path);
    fs.mkdirSync(path);
  }

  public static writeFile(data: any, extension: string): string {
    const filename = this.getFilename(extension);

    const writeStream = fs.createWriteStream(filename);
    const buffer = Buffer.from(data);

    writeStream.write(buffer);
    writeStream.end();

    return filename;
  }
}