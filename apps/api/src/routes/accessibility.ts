import { Router } from 'express';
import { handleGetAccessibilityServices } from '../controllers/accessibility.js';

const router = Router();

router.get('/services', handleGetAccessibilityServices);

export default router;
