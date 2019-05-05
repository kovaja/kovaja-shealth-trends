import { Request, Response } from 'express';

export class UserController {
  public generateUserKey(req: Request, res: Response): void {
    const key = new Date().getTime() * Math.floor(Math.random() * 1000);

    res.status(200).send({ userKey: key });
  }
}