import { Router } from 'express';
import { handleGetLiveMatchStats } from '../controllers/match.js';

const router = Router();

router.get('/live', handleGetLiveMatchStats);

export default router;
