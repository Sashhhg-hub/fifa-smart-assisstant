import { Request, Response, NextFunction } from 'express';
import { TranslationService } from '../services/translation.js';
import { validateTranslation } from '../validators/translation.js';
import { sendSuccess } from '../utils/response.js';
import { AppError } from '../middleware/error.js';

const translationService = new TranslationService();

export async function handleTranslateText(req: Request, res: Response, next: NextFunction) {
  try {
    const { valid, errors } = validateTranslation(req.body);
    if (!valid) {
      throw new AppError(errors?.[0] || 'Invalid request parameters', 400, 'BAD_REQUEST');
    }

    const result = await translationService.translateText(
      req.body.text,
      req.body.sourceLang,
      req.body.targetLang
    );
    sendSuccess(res, { translatedText: result });
  } catch (error) {
    next(error);
  }
}
