import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../utils/custom-error';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: Error, req: Request, res: Response, _: NextFunction) {
  if (err instanceof CustomError) {
    res
      .status(err.statusCode)
      .json({
        status: 'fail',
        code: err.statusCode,
        message: err.message,
      })
      .end();
    return;
  }

  res
    .status(500)
    .json({
      status: 'internal-server-error',
      message: err.message,
    })
    .end();
}
