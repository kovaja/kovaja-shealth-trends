import { Request, Response } from 'express';
import { FileUtility } from '../utilities/file.utility';

export class UserController {
  public generateUserKey(req: Request, res: Response): void {
    const key = new Date().getTime() * Math.floor(Math.random() * 1000);

    const sendKey = (): void => {
      res.status(200).send({ userKey: key });
    };

    FileUtility.initializeUserFolder(key).then(sendKey);
  }
}