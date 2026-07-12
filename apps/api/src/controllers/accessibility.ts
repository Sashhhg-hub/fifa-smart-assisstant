import { Request, Response, NextFunction } from 'express';
import { AccessibilityService } from '../services/accessibility.js';
import { validateAccessibility } from '../validators/accessibility.js';
import { sendSuccess } from '../utils/response.js';
import { AppError } from '../middleware/error.js';

const accessibilityService = new AccessibilityService();

export async function handleGetAccessibilityServices(req: Request, res: Response, next: NextFunction) {
  try {
    const { valid, errors } = validateAccessibility(req.query);
    if (!valid) {
      throw new AppError(errors?.[0] || 'Invalid request parameters', 400, 'BAD_REQUEST');
    }

    const result = await accessibilityService.getAccessibilityServices();
    sendSuccess(res, result, 'Accessibility services metadata retrieved successfully');
  } catch (error) {
    next(error);
  }
}
