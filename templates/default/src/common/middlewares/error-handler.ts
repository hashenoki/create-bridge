import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { CustomError } from '~/common/utils/custom-error';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: Error, req: Request, res: Response, _: NextFunction) {
  if (err instanceof CustomError) {
    res
      .status(err.statusCode)
      .json({
        status: ReasonPhrases.BAD_REQUEST,
        code: err.statusCode,
        message: err.message,
      })
      .end();
    return;
  }

  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({
      status: ReasonPhrases.INTERNAL_SERVER_ERROR,
      message: err.message,
    })
    .end();
}
