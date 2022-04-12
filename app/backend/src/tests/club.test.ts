import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { Response } from 'superagent';
import { app } from '../app';
import ClubModel from '../database/models/club.model';
import mockedClubs = require('./mocks/clubs.json');

chai.use(chaiHttp);

const { expect } = chai;

describe('Route /clubs test cases', function() {
  describe('GET /clubs endpoint', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon.stub(ClubModel, 'findAll').resolves(mockedClubs as ClubModel[]);
    });

    after(() => {
      (ClubModel.findAll as sinon.SinonStub).restore();
    });

    it('should return a 200 status code with the clubs', async () => {
      chaiHttpResponse = await chai.request(app).get('/clubs');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(mockedClubs);
    });
  });
});
