import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { Response } from 'superagent';
import { app } from '../app';
import ClubModel from '../database/models/club.model';
import MatchModel from '../database/models/match.model';
import mockedClubs = require('./mocks/clubs.json');
import mockedLeaderboard = require('./mocks/leaderboard.json');
import mockedMatches = require('./mocks/matches.json');

chai.use(chaiHttp);

const { expect } = chai;

type Match = MatchModel & {
  homeClub: { clubName: string };
  awayClub: { clubName: string };
};

describe('Route /matchs test cases', () => {
  describe('GET /matchs endpoint', function() {
    let chaiHttpResponse: Response;

    before(async function() {
      sinon.stub(MatchModel, 'findAll').resolves(mockedMatches as Match[]);
    });

    after(function() {
      (MatchModel.findAll as sinon.SinonStub).restore();
    });

    it('should return a 200 status code with the matches', async function() {
      chaiHttpResponse = await chai.request(app).get('/matchs');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(mockedMatches);
    });
  });
});

describe('Route /leaderboard test cases', () => {
  describe('GET /leaderboard endpoint', function() {
    let chaiHttpResponse: Response;

    before(async function() {
      sinon.stub(ClubModel, 'findAll').resolves(mockedClubs as ClubModel[]);
      sinon.stub(MatchModel, 'findAll').resolves(mockedMatches as Match[]);
    });

    after(function() {
      (ClubModel.findAll as sinon.SinonStub).restore();
      (MatchModel.findAll as sinon.SinonStub).restore();
    });

    it('should return a 200 status code with the leaderboard', async function() {
      chaiHttpResponse = await chai.request(app).get('/leaderboard');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(mockedLeaderboard);
    });
  });
});
