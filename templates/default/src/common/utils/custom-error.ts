import type { StatusCodes } from 'http-status-codes';

export class CustomError extends Error {
  statusCode: StatusCodes;
  constructor(statusCode: StatusCodes, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}
