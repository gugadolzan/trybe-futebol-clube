import * as Sequelize from 'sequelize';
import Leaderboard from '../classes/Leaderboard';
import Match from '../database/models/match.model';
import Club from '../database/models/club.model';
import throwNewError from '../utils/throwNewError';
import ClubService from './club.service';

export default class MatchService {
  public static async getAll(byProgress?: string) {
    // If byProgress is defined,
    // return all matches with the given progress
    // else return all matches
    const inProgress = byProgress
      ? byProgress === 'true'
      : { [Sequelize.Op.or]: [true, false] };

    return Match.findAll({
      where: { inProgress },
      include: [
        { model: Club, as: 'homeClub', attributes: ['clubName'] },
        { model: Club, as: 'awayClub', attributes: ['clubName'] },
      ],
    });
  }

  public static async create(match: Match) {
    if (match.homeTeam === match.awayTeam) {
      return throwNewError(
        'It is not possible to create a match with two equal teams',
        401,
      );
    }

    const [homeClub, awayClub] = await Promise.all([
      ClubService.getById(match.homeTeam),
      ClubService.getById(match.awayTeam),
    ]);
    if (!homeClub || !awayClub) return throwNewError('There is no team with such id!', 401);

    return Match.create({ ...match, inProgress: true });
  }

  public static async finish(id: number) {
    const match = await Match.findOne({ where: { id } });
    if (!match) return throwNewError('Match not found', 404);
    return match.update({ inProgress: false });
  }

  public static async update(id: number, payload: Match) {
    const match = await Match.findOne({ where: { id } });
    if (!match) return throwNewError('Match not found', 404);
    return match.update(payload);
  }

  public static async getLeaderboard(isHomeTeam?: boolean) {
    const [clubs, matches] = await Promise.all([
      ClubService.getAll(),
      MatchService.getAll(),
    ]);

    const leaderboard = new Leaderboard(clubs, matches);

    return isHomeTeam === undefined
      ? leaderboard.getLeaderboard()
      : leaderboard.getLeaderboardBySide(isHomeTeam);
  }
}
