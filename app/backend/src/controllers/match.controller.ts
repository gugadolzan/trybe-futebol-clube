import { Request, Response } from 'express';
import * as services from '../services';

export default class MatchController {
  public static async getAll(req: Request, res: Response) {
    const matches = await services.Match.getAll(req.query.inProgress as string);
    res.status(200).json(matches);
  }

  public static async create(req: Request, res: Response) {
    const createdMatch = await services.Match.create(req.body);
    res.status(201).json(createdMatch);
  }

  public static async finish(req: Request, res: Response) {
    const match = await services.Match.finish(Number(req.params.id));
    res.status(200).json(match);
  }
}
