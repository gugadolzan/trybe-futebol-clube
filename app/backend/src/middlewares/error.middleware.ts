import { NextFunction, Request, Response } from 'express';

export default class ErrorMiddleware {
  public static handleErrors(
    err: Error & { status: number },
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    const { status = 500, message = 'Internal server error' } = err;
    if (status === 500) console.log(err);
    res.status(status).json({ message });
  }
}
