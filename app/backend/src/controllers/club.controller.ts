import { Request, Response } from 'express';
import * as services from '../services';

export default class ClubController {
  public static async getAll(_req: Request, res: Response) {
    const clubs = await services.Club.getAll();
    res.status(200).json(clubs);
  }

  public static async getById(req: Request, res: Response) {
    const club = await services.Club.getById(Number(req.params.id));
    if (!club) throw new Error('Club not found');
    res.status(200).json(club);
  }
}
