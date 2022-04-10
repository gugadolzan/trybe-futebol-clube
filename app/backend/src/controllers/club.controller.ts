import { Request, Response } from 'express';
import * as services from '../services';

export default class ClubController {
  public static async getAll(_req: Request, res: Response) {
    const clubs = await services.Club.getAll();
    res.status(200).json(clubs);
  }
}
