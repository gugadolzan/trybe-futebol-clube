import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import Jwt from '../utils/Jwt';
import throwNewError from '../utils/throwNewError';

export default class AuthMiddleware {
  public static async verifyToken(req: Request & JwtPayload, _res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) return throwNewError('No token provided', 401);

    // If token is invalid, an error will be thrown
    const user = Jwt.validateToken(token);
    req.user = user;

    next();
  }
}
