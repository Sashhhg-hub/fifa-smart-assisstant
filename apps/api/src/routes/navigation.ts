import { Router } from 'express';
import { handleCalculateRoute } from '../controllers/navigation.js';

const router = Router();

router.get('/route', handleCalculateRoute);

export default router;
