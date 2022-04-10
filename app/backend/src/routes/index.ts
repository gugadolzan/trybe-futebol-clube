import { Router } from 'express';
import loginRouter from './login.route';
import * as middlewares from '../middlewares';

const routes = Router();

routes.use('/login', loginRouter);

routes.use(middlewares.Error.handleErrors);

export default routes;
