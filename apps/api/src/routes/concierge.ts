import { Router } from 'express';
import { handleConciergeChat } from '../controllers/concierge.js';

const router = Router();

router.post('/chat', handleConciergeChat);

export default router;
