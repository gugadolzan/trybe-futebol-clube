import Match from '../database/models/match.model';
import Club from '../database/models/club.model';

export default class MatchService {
  public static async getAll() {
    return Match.findAll({
      include: [
        { model: Club, as: 'homeClub', attributes: ['clubName'] },
        { model: Club, as: 'awayClub', attributes: ['clubName'] },
      ],
    });
  }
}
