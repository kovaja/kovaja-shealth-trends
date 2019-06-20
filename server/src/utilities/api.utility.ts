import { Request, Response } from 'express';
import { IErrorResponse } from '../../../shared/api.schemas';
import { Constants } from '../constants/constants';
import { AppError } from '../models/AppError';
import { Logger } from './logger';

export class ApiUtility {
  public static isFileStreamRequest(req: Request): boolean {
      return req.header('Content-Type') === Constants.OCTET_STREAM_CONTENT_TYPE;
  }

  public static handleError(res: Response): (error: Error | AppError) => void {
    return (error: Error | AppError): void => {
      Logger.error(error);

      const isAppError =  (error as AppError).isAppError;
      const status = isAppError ? 400 : 500;
      const message = isAppError ? error.message : 'Ups, something went wrong';

      const errorResponse: IErrorResponse = { error: message };

      res.status(status).send(errorResponse);
    };
  }

  public static handleResponse(res: Response): (data: any) => void {
    return (data: any): void => {
      res.status(200).send(data);
    };
  }
}