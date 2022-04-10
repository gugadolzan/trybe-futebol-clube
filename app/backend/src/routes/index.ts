import { Router } from 'express';
import clubRouter from './club.route';
import loginRouter from './login.route';
import * as middlewares from '../middlewares';

const routes = Router();

routes.use('/login', loginRouter);
routes.use('/clubs', clubRouter);

routes.use(middlewares.Error.handleErrors);

export default routes;
