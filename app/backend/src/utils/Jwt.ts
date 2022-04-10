import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import { SafeUser } from '../domain';

export default class Jwt {
  private static _options: jwt.SignOptions = {
    algorithm: 'HS256',
    expiresIn: '1d',
  };

  private static _privateKey: string = fs
    .readFileSync('./jwt.evaluation.key')
    .toString();

  public static generateToken(payload: SafeUser) {
    return jwt.sign(payload, this._privateKey, this._options);
  }

  public static validateToken(token: string) {
    return jwt.verify(token, this._privateKey, this._options);
  }
}
