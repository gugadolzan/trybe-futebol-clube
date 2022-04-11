import { Request, Response } from 'express';
import * as services from '../services';

export default class MatchController {
  public static async getAll(req: Request, res: Response) {
    const matches = await services.Match.getAll(req.query.inProgress as string);
    res.status(200).json(matches);
  }
}
