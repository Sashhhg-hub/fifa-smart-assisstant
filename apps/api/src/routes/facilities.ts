import { Router } from 'express';
import { handleGetFacilities } from '../controllers/facilities.js';

const router = Router();

router.get('/', handleGetFacilities);

export default router;
