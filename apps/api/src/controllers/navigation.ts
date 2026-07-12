import { Request, Response, NextFunction } from 'express';
import { NavigationService } from '../services/navigation/navigation.js';
import { validateNavigation } from '../validators/navigation.js';
import { sendSuccess } from '../utils/response.js';
import { AppError } from '../middleware/error.js';

const navigationService = new NavigationService();

export async function handleCalculateRoute(req: Request, res: Response, next: NextFunction) {
  try {
    const { valid, errors } = validateNavigation(req.query);
    if (!valid) {
      throw new AppError(errors?.[0] || 'Invalid request parameters', 400, 'BAD_REQUEST');
    }

    const result = await navigationService.calculateRoute(
      req.query.from as string,
      req.query.to as string
    );
    sendSuccess(res, result, 'Route coordinates calculated successfully');
  } catch (error) {
    next(error);
  }
}
