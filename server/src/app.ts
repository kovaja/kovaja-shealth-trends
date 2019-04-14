import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { appConfig } from './app.config';
import { Routes } from './routes/routes';

const CLIENT_BUILD_PATH = '../../client/build';

class App {
  public app: express.Application;
  public route: Routes;

  constructor() {
    this.app = express();
    this.initFileFolder();
    this.config();
  }

  private serveIndex(req: express.Request, res: express.Response): void {
    res.sendFile(path.join(__dirname, CLIENT_BUILD_PATH, 'index.html'));
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.raw({ limit: '100mb' }));
    this.app.use(bodyParser.urlencoded({ extended: false }));

    const staticPath = path.join(__dirname, CLIENT_BUILD_PATH);
    this.app.use(express.static(staticPath));
    this.app.get('/', this.serveIndex.bind(this));

    this.route = new Routes();
    this.route.initRoutes(this.app);
  }

  private initFileFolder(): void {
    if (!fs.existsSync(appConfig.FILE_STORAGE_PATH)) {
      fs.mkdirSync(appConfig.FILE_STORAGE_PATH);
    }
  }
}

export default new App().app;