import { Request, Response, NextFunction } from 'express';
import { FoodService } from '../services/food.js';
import { validateFood } from '../validators/food.js';
import { sendSuccess } from '../utils/response.js';
import { AppError } from '../middleware/error.js';

const foodService = new FoodService();

export async function handleGetFoodVendors(req: Request, res: Response, next: NextFunction) {
  try {
    const { valid, errors } = validateFood(req.query);
    if (!valid) {
      throw new AppError(errors?.[0] || 'Invalid request parameters', 400, 'BAD_REQUEST');
    }

    const result = await foodService.getVendors();
    sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
}
