import { Request, Response, NextFunction } from 'express';
import { FacilitiesService } from '../services/facilities.js';
import { validateFacilities } from '../validators/facilities.js';
import { sendSuccess } from '../utils/response.js';
import { AppError } from '../middleware/error.js';

const facilitiesService = new FacilitiesService();

export async function handleGetFacilities(req: Request, res: Response, next: NextFunction) {
  try {
    const { valid, errors } = validateFacilities(req.query);
    if (!valid) {
      throw new AppError(errors?.[0] || 'Invalid request parameters', 400, 'BAD_REQUEST');
    }

    const result = await facilitiesService.getFacilities();
    sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
}
