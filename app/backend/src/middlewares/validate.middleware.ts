import { NextFunction, Request, Response } from 'express';
import Match from '../database/models/match.model';
import throwNewError from '../utils/throwNewError';

export default class ValidateMiddleware {
  public static async matchBody(req: Request, _res: Response, next: NextFunction) {
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

    next();
  }
}
