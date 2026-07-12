import { Router } from 'express';
import { handleTranslateText } from '../controllers/translation.js';

const router = Router();

router.post('/translate', handleTranslateText);

export default router;
