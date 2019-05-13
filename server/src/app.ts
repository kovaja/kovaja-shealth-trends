import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as path from 'path';
import { AppConfig } from './app.config';
import { Routes } from './routes/routes';
import { ApiUtility } from './utilities/api.utility';
import { FileUtility } from './utilities/file.utility';

class App {
  private bodyParserJsonHandler: (req: express.Request, res: express.Response, next: express.NextFunction) => void;

  public app: express.Application;
  public route: Routes;

  constructor() {
    this.app = express();
    this.bodyParserJsonHandler = bodyParser.json();

    FileUtility.initializeFileFolder();

    this.config();
  }

  private serveIndex(req: express.Request, res: express.Response): void {
    res.sendFile(path.join(__dirname, AppConfig.CLIENT_BUILD_PATH, 'index.html'));
  }

  private firstHandler(req: express.Request, res: express.Response, next: express.NextFunction): void {
    if (ApiUtility.isFileStreamRequest(req)) {
      next();
      return;
    }

    this.bodyParserJsonHandler(req, res, next);
  }

  private config(): void {
    this.app.use(this.firstHandler.bind(this));
    this.app.use(bodyParser.urlencoded({ extended: false }));

    const staticPath = path.join(__dirname, AppConfig.CLIENT_BUILD_PATH);
    this.app.use(express.static(staticPath));

    this.app.get('/', this.serveIndex.bind(this));

    this.route = new Routes();
    this.route.initRoutes(this.app);
  }
}

export default new App().app;