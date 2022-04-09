module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matchs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      homeTeam: {
        allowNull: false,
        field: 'home_team',
        // Configures what should happen when updating or deleting a team.
        // In this case, all matches for that team will be changed or deleted.
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'clubs',
          key: 'id',
        },
        type: Sequelize.INTEGER,
      },
      homeTeamGoals: {
        allowNull: false,
        field: 'home_team_goals',
        type: Sequelize.INTEGER,
      },
      awayTeam: {
        allowNull: false,
        field: 'away_team',
        // Configures what should happen when updating or deleting a team.
        // In this case, all matches for that team will be changed or deleted.
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'clubs',
          key: 'id',
        },
        type: Sequelize.INTEGER,
      },
      awayTeamGoals: {
        allowNull: false,
        field: 'away_team_goals',
        type: Sequelize.INTEGER,
      },
      inProgress: {
        allowNull: false,
        field: 'in_progress',
        type: Sequelize.BOOLEAN,
      },
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('matchs');
  },
};
