import { Router } from 'express';
import * as controllers from '../controllers';
import * as middlewares from '../middlewares';

const router = Router();

router.post('/', controllers.User.login);
router.use(middlewares.Auth.verifyToken);
router.get('/validate', controllers.User.validateLogin);

export default router;
