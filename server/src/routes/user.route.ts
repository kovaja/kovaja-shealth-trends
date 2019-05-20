import { Request, Response, Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { ApiUtility } from '../utilities/api.utility';

export class UserRoute {
  private controller: UserController;
  constructor(router: Router) {
    const subRouter = Router();
    this.controller = new UserController();

    router.use('/user', subRouter);

    subRouter.get('/init', this.handleUserInit.bind(this));
    subRouter.post('/tearDown/:key', this.handleUserTearDown.bind(this));
  }

  private handleUserInit(req: Request, res: Response): void {
    this.controller.generateUserKey()
      .then(ApiUtility.handleResponse(res))
      .catch(ApiUtility.handleError(res));
  }

  private handleUserTearDown(req: Request, res: Response): void {
    const userKey = req.params['key'];

    this.controller.clearAfterUser(userKey);
  }
}