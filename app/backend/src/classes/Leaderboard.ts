import Club from '../database/models/club.model';
import Match from '../database/models/match.model';

interface Stats {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}

export default class Leaderboard {
  private _clubs: Club[];

  private _matches: Match[];

  constructor(clubs: Club[], matches: Match[]) {
    this._clubs = clubs;
    this._matches = matches;
  }

  private static _initialLeaderboard(clubName: string) {
    return {
      name: clubName,
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0,
    };
  }

  private static _sortLeaderboard(leaderboard: Stats[]) {
    return leaderboard.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
      if (a.totalVictories !== b.totalVictories) { return b.totalVictories - a.totalVictories; }
      if (a.goalsBalance !== b.goalsBalance) { return b.goalsBalance - a.goalsBalance; }
      if (a.goalsFavor !== b.goalsFavor) return b.goalsFavor - a.goalsFavor;
      if (a.goalsOwn !== b.goalsOwn) return b.goalsOwn - a.goalsOwn;
      return 0;
    });
  }

  private static _matchResult(match: Match, isHomeTeam: boolean) {
    const [teamGoals, awayGoals] = isHomeTeam
      ? [match.homeTeamGoals, match.awayTeamGoals]
      : [match.awayTeamGoals, match.homeTeamGoals];

    const points = teamGoals > awayGoals ? 3 : 0;

    return {
      points: teamGoals === awayGoals ? 1 : points,
      goalsFavor: teamGoals,
      goalsOwn: awayGoals,
      goalsBalance: teamGoals - awayGoals,
    };
  }

  private static _calcEfficiency(totalPoints: number, totalGames: number) {
    return Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2));
  }

  private static _clubStats(clubName: string, matches: Match[], isHomeTeam: boolean) {
    const stats = matches.reduce((total: Stats, match: Match) => {
      const { points, goalsFavor, goalsOwn } = Leaderboard._matchResult(match, isHomeTeam);
      return {
        ...total,
        totalPoints: total.totalPoints + points,
        totalGames: total.totalGames + 1,
        totalVictories: total.totalVictories + (points === 3 ? 1 : 0),
        totalDraws: total.totalDraws + (points === 1 ? 1 : 0),
        totalLosses: total.totalLosses + (points === 0 ? 1 : 0),
        goalsFavor: total.goalsFavor + goalsFavor,
        goalsOwn: total.goalsOwn + goalsOwn,
        goalsBalance: total.goalsBalance + goalsFavor - goalsOwn,
      };
    }, Leaderboard._initialLeaderboard(clubName));

    stats.efficiency = Leaderboard._calcEfficiency(stats.totalPoints, stats.totalGames);

    return stats;
  }

  private static _mergeStats(clubName: string, homeStats: Stats, awayStats: Stats) {
    return {
      name: clubName,
      totalPoints: homeStats.totalPoints + awayStats.totalPoints,
      totalGames: homeStats.totalGames + awayStats.totalGames,
      totalVictories: homeStats.totalVictories + awayStats.totalVictories,
      totalDraws: homeStats.totalDraws + awayStats.totalDraws,
      totalLosses: homeStats.totalLosses + awayStats.totalLosses,
      goalsFavor: homeStats.goalsFavor + awayStats.goalsFavor,
      goalsOwn: homeStats.goalsOwn + awayStats.goalsOwn,
      goalsBalance: homeStats.goalsBalance + awayStats.goalsBalance,
      efficiency: this._calcEfficiency(
        homeStats.totalPoints + awayStats.totalPoints,
        homeStats.totalGames + awayStats.totalGames,
      ),
    };
  }

  public getLeaderboardBySide(isHomeTeam: boolean) {
    const leaderboard = this._clubs.reduce((acc: Stats[], club: Club) => {
      const matchesInProgress = this._matches
        .filter((match: Match) =>
          (isHomeTeam ? match.homeTeam === club.id : match.awayTeam === club.id))
        .filter((match: Match) => !match.inProgress);

      const clubStats = Leaderboard._clubStats(club.clubName, matchesInProgress, isHomeTeam);
      return [...acc, clubStats];
    }, []);

    return Leaderboard._sortLeaderboard(leaderboard);
  }

  public getLeaderboard() {
    const [homeLeaderboard, awayLeaderboard] = [
      this.getLeaderboardBySide(true),
      this.getLeaderboardBySide(false),
    ];
    const leaderboard = homeLeaderboard.reduce((acc: Stats[], homeStats: Stats) => {
      const { name: clubName } = homeStats;

      const awayStats = awayLeaderboard.find(({ name }: Stats) => name === clubName) as Stats;
      const clubStats = Leaderboard._mergeStats(clubName, homeStats, awayStats);

      return [...acc, clubStats];
    }, []);
    return Leaderboard._sortLeaderboard(leaderboard);
  }
}
