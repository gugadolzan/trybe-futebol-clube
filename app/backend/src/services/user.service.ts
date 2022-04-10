import User from '../database/models/user.model';
import Bcrypt from '../utils/Bcrypt';

export default class UserService {
  public static async login(email: string, password: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) return null;

    const isPasswordValid = await Bcrypt.comparePassword(password, user.password);
    if (!isPasswordValid) return null;

    const { id, username, role } = user;
    return { id, username, role, email };
  }
}
