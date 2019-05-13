import { Application, Request, Response, Router } from 'express';
import { ApiUtility } from '../utilities/api.utility';
import { CSVRoute } from './csv.route';
import { UserRoute } from './user.route';

export class Routes {
  private handlePingRequest(req: Request, res: Response): void {
    ApiUtility.handleResponse(res)('PONG! ' + new Date());
  }

  public initRoutes(app: Application): void {
    const router = Router();

    new UserRoute(router);
    new CSVRoute(router);

    app.use('/api', router);

    app.get('/api/ping', this.handlePingRequest.bind(this));
  }
}