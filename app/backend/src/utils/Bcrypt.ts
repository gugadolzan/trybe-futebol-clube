import * as bcrypt from 'bcryptjs';

export default class Bcrypt {
  public static async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  public static async comparePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}
