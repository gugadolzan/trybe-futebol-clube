import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import User from '../database/models/user.model';
import * as services from '../services';
import Jwt from '../utils/Jwt';

export default class UserController {
  public static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) throw new Error('All fields must be filled');

    const user = await services.User.login(email, password);
    if (!user) throw new Error('Incorrect email or password');

    const token = Jwt.generateToken(user as User);
    res.status(200).json({ user, token });
  }

  public static async validateLogin(req: Request & JwtPayload, res: Response) {
    const { role } = req.user;
    res.status(200).send(role);
  }
}
