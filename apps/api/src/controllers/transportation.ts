import { Request, Response, NextFunction } from 'express';
import { TransportationService } from '../services/transportation.js';
import { validateTransportation } from '../validators/transportation.js';
import { sendSuccess } from '../utils/response.js';
import { AppError } from '../middleware/error.js';

const transportationService = new TransportationService();

export async function handleGetTransitOptions(req: Request, res: Response, next: NextFunction) {
  try {
    const { valid, errors } = validateTransportation(req.query);
    if (!valid) {
      throw new AppError(errors?.[0] || 'Invalid request parameters', 400, 'BAD_REQUEST');
    }

    const result = await transportationService.getTransitOptions();
    sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
}
