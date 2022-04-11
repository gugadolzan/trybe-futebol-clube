import { DataTypes, Model } from 'sequelize';
import db from '.';
import Match from './match.model';

class Club extends Model {
  public id!: number;

  public clubName!: string;
}

Club.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    clubName: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    sequelize: db,
    tableName: 'clubs',
    // Removes createdAt and updatedAt timestamps to the model
    timestamps: false,
    // Converts all camelCased columns to snake_case
    underscored: true,
  },
);

// Associations
Match.belongsTo(Club, { foreignKey: 'homeTeam', as: 'homeClub' });
Match.belongsTo(Club, { foreignKey: 'awayTeam', as: 'awayClub' });

Club.hasMany(Match, { foreignKey: 'homeTeam', as: 'homeTeamMatches' });
Club.hasMany(Match, { foreignKey: 'awayTeam', as: 'awayTeamMatches' });

export default Club;
