import { DataTypes, Model } from 'sequelize';
import db from '.';

class User extends Model {
  public id!: number;

  public username!: string;

  public role!: string;

  public email!: string;

  public password!: string;
}

User.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    role: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    tableName: 'users',
    // Removes createdAt and updatedAt timestamps to the model
    timestamps: false,
    // Converts all camelCased columns to snake_case
    underscored: true,
  },
);

export default User;
