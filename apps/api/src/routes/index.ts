import { Router } from 'express';
import conciergeRouter from './concierge.js';
import navigationRouter from './navigation.js';
import matchRouter from './match.js';
import foodRouter from './food.js';
import emergencyRouter from './emergency.js';
import accessibilityRouter from './accessibility.js';
import translationRouter from './translation.js';
import facilitiesRouter from './facilities.js';
import lostfoundRouter from './lostfound.js';
import transportationRouter from './transportation.js';

const router = Router();

router.use('/concierge', conciergeRouter);
router.use('/navigation', navigationRouter);
router.use('/match', matchRouter);
router.use('/food', foodRouter);
router.use('/emergency', emergencyRouter);
router.use('/accessibility', accessibilityRouter);
router.use('/translation', translationRouter);
router.use('/facilities', facilitiesRouter);
router.use('/lostfound', lostfoundRouter);
router.use('/transportation', transportationRouter);

export default router;
