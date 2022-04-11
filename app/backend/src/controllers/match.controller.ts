import { Request, Response } from 'express';
import * as services from '../services';

export default class MatchController {
  public static async getAll(_req: Request, res: Response) {
    const matches = await services.Match.getAll();
    res.status(200).json(matches);
  }
}
