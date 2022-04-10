import { Router } from 'express';
import * as controllers from '../controllers';

const router = Router();

router.get('/', controllers.Club.getAll);
router.get('/:id', controllers.Club.getById);

export default router;
