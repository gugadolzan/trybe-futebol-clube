import Club from '../database/models/club.model';

export default class ClubService {
  public static async getAll() {
    return Club.findAll();
  }
}
