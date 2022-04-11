import { Request, Response } from 'express';
import * as services from '../services';
import throwNewError from '../utils/throwNewError';

export default class ClubController {
  public static async getAll(_req: Request, res: Response) {
    const clubs = await services.Club.getAll();
    res.status(200).json(clubs);
  }

  public static async getById(req: Request, res: Response) {
    const club = await services.Club.getById(Number(req.params.id));
    if (!club) return throwNewError('Club not found', 404);
    res.status(200).json(club);
  }
}
