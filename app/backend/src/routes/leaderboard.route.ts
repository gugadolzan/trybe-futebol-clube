import { Router } from 'express';
import * as controllers from '../controllers';

const router = Router();

router.get('/home', controllers.Match.getLeaderboardBySide);
router.get('/away', controllers.Match.getLeaderboardBySide);
router.get('/', controllers.Match.getLeaderboard);

export default router;
