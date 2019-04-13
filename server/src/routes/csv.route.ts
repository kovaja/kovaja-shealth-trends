import { Router } from 'express';
import { CSVController } from '../controllers/csv.controller';

export class CSVRoute {
  constructor(router: Router) {
    const subRouter = Router();
    const controller = new CSVController();

    router.use('/csv', subRouter);

    subRouter.post('/base64', controller.processBase64Csv.bind(controller));
  }
}