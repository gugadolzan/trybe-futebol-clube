import Club from '../database/models/club.model';

export default class ClubService {
  public static async getAll() {
    return Club.findAll();
  }

  public static async getById(id: number) {
    return Club.findByPk(id);
  }
}
