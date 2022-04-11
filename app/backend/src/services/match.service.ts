import * as Sequelize from 'sequelize';
import Match from '../database/models/match.model';
import Club from '../database/models/club.model';

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
}
