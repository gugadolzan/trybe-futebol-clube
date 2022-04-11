import * as Sequelize from 'sequelize';
import Match from '../database/models/match.model';
import Club from '../database/models/club.model';
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
      throw new Error(
        'It is not possible to create a match with two equal teams',
      );
    }

    const [homeClub, awayClub] = await Promise.all([
      ClubService.getById(match.homeTeam),
      ClubService.getById(match.awayTeam),
    ]);
    if (!homeClub || !awayClub) {
      throw new Error('There is no team with such id!');
    }

    return Match.create(match);
  }

  public static async finish(id: number) {
    const match = await Match.findOne({ where: { id } });
    if (!match) throw new Error('There is no match with such id!');

    return match.update({ inProgress: false });
  }
}
