import { Request, Response, Router } from 'express';
import { CSVController } from '../controllers/csv.controller';
import { AppError } from '../models/AppError';
import { ApiUtility } from '../utilities/api.utility';

export class CSVRoute {
  private controller: CSVController;

  constructor(router: Router) {
    const subRouter = Router();
    this.controller = new CSVController();

    router.use('/csv', subRouter);

    subRouter.post('/upload/:key/heartrate', this.handleHeartRateUpload.bind(this));
    subRouter.post('/upload/:key/sleep', this.handleSleepUpload.bind(this));
  }

  private handleHeartRateUpload(req: Request, res: Response): void {
    if (ApiUtility.isFileStreamRequest(req) === false) {
      ApiUtility.handleError(res)(new AppError('Wrong content type'));
      return;
    }

    new Promise(this.controller.handleHeartRateStream.bind(this.controller, req))
      .then(ApiUtility.handleResponse(res))
      .catch(ApiUtility.handleError(res));
  }

  private handleSleepUpload(req: Request, res: Response): void {
    if (ApiUtility.isFileStreamRequest(req) === false) {
      ApiUtility.handleError(res)(new AppError('Wrong content type'));
      return;
    }

    new Promise(this.controller.handleSleepStream.bind(this.controller, req))
      .then(ApiUtility.handleResponse(res))
      .catch(ApiUtility.handleError(res));
  }
}