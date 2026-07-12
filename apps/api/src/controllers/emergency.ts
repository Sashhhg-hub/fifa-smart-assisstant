import { Request, Response, NextFunction } from 'express';
import { EmergencyService } from '../services/emergency.js';
import { validateEmergency } from '../validators/emergency.js';
import { sendSuccess } from '../utils/response.js';
import { AppError } from '../middleware/error.js';

const emergencyService = new EmergencyService();

export async function handleTriggerEmergencyAlert(req: Request, res: Response, next: NextFunction) {
  try {
    const { valid, errors } = validateEmergency(req.body);
    if (!valid) {
      throw new AppError(errors?.[0] || 'Invalid request parameters', 400, 'BAD_REQUEST');
    }

    const result = await emergencyService.triggerAlert(
      req.body.type,
      req.body.locationDetails,
      req.body.coordinates
    );
    sendSuccess(res, result, 201);
  } catch (error) {
    next(error);
  }
}
