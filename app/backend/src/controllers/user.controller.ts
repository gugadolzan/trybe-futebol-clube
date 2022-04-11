import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import User from '../database/models/user.model';
import * as services from '../services';
import Jwt from '../utils/Jwt';
import throwNewError from '../utils/throwNewError';

export default class UserController {
  public static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) return throwNewError('All fields must be filled', 401);

    const user = await services.User.login(email, password);
    if (!user) return throwNewError('Incorrect email or password', 401);

    const token = Jwt.generateToken(user as User);
    res.status(200).json({ user, token });
  }

  public static async validateLogin(req: Request & JwtPayload, res: Response) {
    const { role } = req.user;
    res.status(200).send(role);
  }
}
