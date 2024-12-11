import { NextFunction, Request, Response } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { CustomError } from '~/common/utils/custom-error';

export function fallbackHandler(req: Request, res: Response, next: NextFunction) {
  next(new CustomError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND));
}
