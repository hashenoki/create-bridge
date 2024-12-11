import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../utils/custom-error';

export function fallbackHandler(req: Request, res: Response, next: NextFunction) {
  next(new CustomError(404, `Resource not found at ${req.originalUrl}`));
}
