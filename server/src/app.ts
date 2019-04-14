import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as path from 'path';
import { Routes } from './routes/routes';
import { FileUtility } from './utilities/file.utility';

const CLIENT_BUILD_PATH = '../../client/build';

class App {
  public app: express.Application;
  public route: Routes;

  constructor() {
    this.app = express();

    FileUtility.initializeFileFolder();

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
}

export default new App().app;