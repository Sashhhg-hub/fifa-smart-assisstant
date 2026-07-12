import { Router } from 'express';
import { handleGetTransitOptions } from '../controllers/transportation.js';

const router = Router();

router.get('/routes', handleGetTransitOptions);

export default router;
