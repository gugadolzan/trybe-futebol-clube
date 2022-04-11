import { Request, Response } from 'express';
import Match from '../database/models/match.model';
import * as services from '../services';
import throwNewError from '../utils/throwNewError';

export default class MatchController {
  public static async getAll(req: Request, res: Response) {
    const matches = await services.Match.getAll(req.query.inProgress as string);
    res.status(200).json(matches);
  }

  public static async create(req: Request, res: Response) {
    const match = {
      homeTeam: req.body.homeTeam,
      awayTeam: req.body.awayTeam,
      homeTeamGoals: req.body.homeTeamGoals || req.body.homeGoals,
      awayTeamGoals: req.body.awayTeamGoals || req.body.awayGoals,
      inProgress: true,
    } as Match;

    if (
      match.homeTeam === undefined
      || match.awayTeam === undefined
      || match.homeTeamGoals === undefined
      || match.awayTeamGoals === undefined
    ) {
      return throwNewError('All fields must be filled', 401);
    }

    const createdMatch = await services.Match.create(match);
    res.status(201).json(createdMatch);
  }

  public static async finish(req: Request, res: Response) {
    const match = await services.Match.finish(Number(req.params.id));
    res.status(200).json(match);
  }
}
