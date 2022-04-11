import 'express-async-errors';
import * as express from 'express';
import * as cors from 'cors';
import routes from './routes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(accessControl);
    this.app.use('/', routes);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  }
}

export { App };

export const { app } = new App();
