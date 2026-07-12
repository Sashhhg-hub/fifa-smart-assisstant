import { Request, Response, NextFunction } from 'express';
import { LostFoundService } from '../services/lostfound.js';
import { validateLostFound } from '../validators/lostfound.js';
import { sendSuccess } from '../utils/response.js';
import { AppError } from '../middleware/error.js';

const lostFoundService = new LostFoundService();

export async function handleGetLostFoundReports(_req: Request, res: Response, next: NextFunction) {
  try {
    const result = await lostFoundService.getReports();
    sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
}

export async function handleCreateLostFoundReport(req: Request, res: Response, next: NextFunction) {
  try {
    const { valid, errors } = validateLostFound(req.body);
    if (!valid) {
      throw new AppError(errors?.[0] || 'Invalid request parameters', 400, 'BAD_REQUEST');
    }

    const result = await lostFoundService.createReport(req.body);
    sendSuccess(res, result, 201);
  } catch (error) {
    next(error);
  }
}
