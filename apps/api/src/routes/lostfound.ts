import { Router } from 'express';
import { handleGetLostFoundReports, handleCreateLostFoundReport } from '../controllers/lostfound.js';

const router = Router();

router.get('/reports', handleGetLostFoundReports);
router.post('/reports', handleCreateLostFoundReport);

export default router;
