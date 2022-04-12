import { Router } from 'express';
import clubRouter from './club.route';
import leaderboardRouter from './leaderboard.route';
import loginRouter from './login.route';
import matchRouter from './match.route';
import * as middlewares from '../middlewares';

const routes = Router();

routes.use('/login', loginRouter);
routes.use('/clubs', clubRouter);
routes.use('/matchs', matchRouter);
routes.use('/leaderboard', leaderboardRouter);

routes.use(middlewares.Error.handleErrors);

export default routes;
