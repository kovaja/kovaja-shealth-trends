import { Application, Request, Response, Router } from 'express';

export class Routes {
  private handlePingRequest(req: Request, res: Response): void {
    res.status(200).send({
      message: 'PONG! ' + new Date()
    });
  }

  public initRoutes(app: Application): void {
    const router = Router();

    // new UserRoute(router);

    app.use('/api', router);

    app.get('/api/ping', this.handlePingRequest.bind(this));
  }
}