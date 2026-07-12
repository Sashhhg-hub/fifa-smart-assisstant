import { Response } from 'express';

export function sendSuccess(res: Response, data: unknown, message = 'Success', status = 200) {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
}

export function sendError(res: Response, message: string, code?: string, status = 500) {
  return res.status(status).json({
    success: false,
    error: message,
    code,
  });
}
