import { Router } from 'express';
import * as controllers from '../controllers';
import * as middlewares from '../middlewares';

const router = Router();

router.get('/', controllers.Match.getAll);
router.use(middlewares.Auth.verifyToken);
router.post('/', controllers.Match.create);
router.patch('/:id/finish', controllers.Match.finish);

export default router;
