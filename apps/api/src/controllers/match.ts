import { Request, Response, NextFunction } from 'express';
import { MatchService } from '../services/match.js';
import { validateMatch } from '../validators/match.js';
import { sendSuccess } from '../utils/response.js';
import { AppError } from '../middleware/error.js';

const matchService = new MatchService();

export async function handleGetLiveMatchStats(req: Request, res: Response, next: NextFunction) {
  try {
    const { valid, errors } = validateMatch(req.query);
    if (!valid) {
      throw new AppError(errors?.[0] || 'Invalid request parameters', 400, 'BAD_REQUEST');
    }

    const result = await matchService.getLiveMatchStats();
    sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
}
