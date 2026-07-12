import { Router } from 'express';
import { handleTriggerEmergencyAlert } from '../controllers/emergency.js';

const router = Router();

router.post('/alert', handleTriggerEmergencyAlert);

export default router;
