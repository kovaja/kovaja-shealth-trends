import { Request } from 'express';
import { Constants } from '../constants/constants';

export class CommonUtility {
  public static isFileStreamRequest(req: Request): boolean {
      return req.header('Content-Type') === Constants.OCTET_STREAM_CONTENT_TYPE;
  }
}