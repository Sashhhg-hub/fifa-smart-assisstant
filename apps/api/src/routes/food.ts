import { Router } from 'express';
import { handleGetFoodVendors } from '../controllers/food.js';

const router = Router();

router.get('/vendors', handleGetFoodVendors);

export default router;
