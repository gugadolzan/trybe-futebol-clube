import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { Response } from 'superagent';
import { app } from '../app';
import UserModel from '../database/models/user.model';
// import Jwt from '../utils/Jwt';
import mockedUsers = require('./mocks/users.json');

chai.use(chaiHttp);

const { expect } = chai;

describe('Route /login test cases', () => {
  describe('POST /login endpoint', function() {
    describe('when the login is successful', function() {
      let chaiHttpResponse: Response;

      before(async function() {
        sinon.stub(UserModel, 'findOne').resolves(mockedUsers[0] as UserModel);
      });

      after(function() {
        (UserModel.findOne as sinon.SinonStub).restore();
      });

      it('should return a 200 status code with the user and a token', async function() {
        const { password, ...user } = mockedUsers[0];

        chaiHttpResponse = await chai
          .request(app)
          .post('/login')
          .send({ email: 'admin@admin.com', password: 'secret_admin' });

        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body.user).to.be.deep.equal(user);
        expect(chaiHttpResponse.body).to.have.property('token');
      });
    });
  });

  // describe('GET /login/validate endpoint', () => {
  //   describe('when the token is valid', () => {
  //     let chaiHttpResponse: Response;

  //     it('should return a 200 status code with the user role', async () => {
  //       const { password, ...user } = mockedUsers[0];

  //       chaiHttpResponse = await chai
  //         .request(app)
  //         .post('/login/validate')
  //         .set({ authorization: Jwt.generateToken(user as UserModel) });

  //       expect(chaiHttpResponse.status).to.be.equal(200);
  //       expect(chaiHttpResponse.body.role).to.be.deep.equal('admin');
  //     });
  //   });
  // });
});
