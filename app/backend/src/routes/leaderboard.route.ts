import { Router } from 'express';
import * as controllers from '../controllers';

const router = Router();

router.get('/home', controllers.Match.getLeaderboard);
router.get('/away', controllers.Match.getLeaderboard);
router.get('/', controllers.Match.getLeaderboard);

export default router;
