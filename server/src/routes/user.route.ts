import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

export class UserRoute {
  constructor(router: Router) {
    const subRouter = Router();
    const controller = new UserController();

    router.use('/user', subRouter);

    subRouter.get('/init', controller.generateUserKey.bind(controller));
  }
}