import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import { requestLogger } from './middleware/logger.js';
import { errorHandler, AppError } from './middleware/error.js';
import apiRouter from './routes/index.js';

export function createApp() {
  const app = express();

  // 1. Security & Optimization Middleware
  app.use(helmet());
  app.use(cors());
  app.use(compression());
  app.use(express.json());

  // 2. Request Logger Middleware
  app.use(requestLogger);

  // 3. Health Check route
  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  // 4. Mount Versioned API Routes
  app.use('/api/v1', apiRouter);

  // 5. Global 404 Handler for Unmatched Routes
  app.use((req, _res, next) => {
    next(
      new AppError(
        `Cannot find ${req.method} ${req.originalUrl} on this server`,
        404,
        'NOT_FOUND'
      )
    );
  });

  // 6. Centralized Error Handler Middleware
  app.use(errorHandler);

  return app;
}
