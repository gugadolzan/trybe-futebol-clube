import { NextFunction, Request, Response } from 'express';
import StatusCodes from '../utils/StatusCodes';

const customErrors: { [key: string]: number } = {
  'All fields must be filled': StatusCodes.UNAUTHORIZED,
  'Club not found': StatusCodes.NOT_FOUND,
  'Incorrect email or password': StatusCodes.UNAUTHORIZED,
  'Internal server error': StatusCodes.INTERNAL_SERVER_ERROR,
  'Invalid token': StatusCodes.UNAUTHORIZED,
  'It is not possible to create a match with two equal teams': StatusCodes.UNAUTHORIZED,
  'No token provided': StatusCodes.UNAUTHORIZED,
  'There is no team with such id!': StatusCodes.UNAUTHORIZED,
};

export default class ErrorMiddleware {
  public static handleErrors(err: Error, _req: Request, res: Response, _next: NextFunction) {
    let message = 'Internal server error';

    if (err.name === 'JsonWebTokenError') message = 'Invalid token';
    if (customErrors[err.message]) message = err.message;

    if (message === 'Internal server error') console.log(err);

    res.status(customErrors[message]).json({ message });
  }
}
