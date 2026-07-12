import { Request, Response, NextFunction } from 'express';
import { GeminiService } from '../services/ai/gemini.js';
import { validateConcierge } from '../validators/concierge.js';
import { sendSuccess } from '../utils/response.js';
import { AppError } from '../middleware/error.js';

const geminiService = new GeminiService();

export async function handleConciergeChat(req: Request, res: Response, next: NextFunction) {
  try {
    const { valid, errors } = validateConcierge(req.body);
    if (!valid) {
      throw new AppError(errors?.[0] || 'Invalid request parameters', 400, 'BAD_REQUEST');
    }

    const result = await geminiService.generateReply(req.body.prompt, req.body.context);
    sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
}
