import Chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import index from '../src/index';
import config from '../src/db/config/envirnoment';

Chai.use(chaiHttp);
Chai.should();
Chai.expect();
dotenv.config();

const userToken = jwt.sign({ username: 'samuel', email: 'sa@andela.com' }, process.env.SECRET_JWT_KEY, { expiresIn: '24h' });
describe('User Routes', () => {
/**
     * signup tests
     */
  describe('User Tests', () => {
    before('should be able to register a new user', (done) => {
      const user = {
        username: 'samuel',
        email: 'sa@andela.com',
        password: 'Password123'
      };
      Chai.request(index)
        .post('/api/users')
        .send(user)
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.status.should.eql(201);
          done();
        });
    });
    before('should be able to register a new user', (done) => {
      const user = {
        username: 'julien',
        email: 'julien@andela.com',
        password: 'Password123'
      };
      Chai.request(index)
        .post('/api/users')
        .send(user)
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.status.should.eql(201);
          done();
        });
    });
    before('should return user verified when he click the link from email', (done) => {
      const email = 'sa@andela.com';
      Chai.request(index)
        .post(`/api/verification?token=${config.token}&email=${email}`)
        .end((err, res) => {
          res.body.should.be.an('object');
          res.status.should.equal(403);
        });
      done();
    });
    it('should not register a user with an existing email ', (done) => {
      const user = {
        username: 'Emilen',
        email: 'sa@andela.com',
        password: 'passme'
      };
      Chai.request(index)
        .post('/api/users')
        .send(user)
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.message.should.equal('user with the same email already exist');
          res.status.should.equal(409);
        });
      done();
    });
    it('should be able to register a new user', (done) => {
      const user = {
        username: 'Sam',
        email: 'sam@andela.com',
        password: 'passme'
      };
      Chai.request(index)
        .post('/api/users')
        .send(user)
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.message.should.equal('Thank you for registration, You should check your email for verification');
          res.status.should.equal(201);
        });
      done();
    });

    it('should return user verified when he click the link from email', (done) => {
      const email = 'sam@andela.com';
      Chai.request(index)
        .post(`/api/verification?token=${config.token}&email=${email}`)
        .end((err, res) => {
          res.body.should.be.an('object');
          res.status.should.equal(403);
        });
      done();
    });

    it('should allow a user to login', (done) => {
      const user = {
        username: 'Sam',
        email: 'sa@andela.com',
        password: 'Password123'
      };
      Chai.request(index)
        .post('/api/users/login')
        .send(user)
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.user.username.should.equal('samuel');
          res.body.user.email.should.equal('sa@andela.com');
          res.body.user.token.should.be.a('string');
          res.status.should.equal(200);
        });
      done();
    });

    it('should not allow a user to login with a wrong password', (done) => {
      const user = {
        email: 'sa@andela.com',
        password: 'Password'
      };
      Chai.request(index)
        .post('/api/users/login')
        .send(user)
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.message.should.equal('incorrect password');
          res.status.should.equal(401);
        });
      done();
    });

    it('should not allow a user to login if the email provided is wrong', (done) => {
      const user = {
        email: 'notexist@andela.com',
        password: 'Password123'
      };
      Chai.request(index)
        .post('/api/users/login')
        .send(user)
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.message.should.equal('user with email: notexist@andela.com does not exist');
          res.status.should.equal(404);
        });
      done();
    });

    /**
   * reset password tests
   */
    it('should not send reset password link using invalid email', (done) => {
      const user = {
        email: 'never#andela.com',
      };
      Chai.request(index)
        .post('/api/user/forgot-password')
        .send(user)
        .end((err, res) => {
          res.status.should.be.eql(400);
          res.body.error.should.be.an('string');
        });
      done();
    });

    it('should send a reset password link to a user\'s email', (done) => {
      const user = {
        email: 'sa@andela.com',
      };
      Chai.request(index)
        .post('/api/user/forgot-password')
        .send(user)
        .end((err, res) => {
          res.status.should.be.eql(200);
          res.body.message.should.be.a('string');
        });
      done();
    });

    it('should not reset the password with a weak password', (done) => {
      const user = {
        password: 'pass',
        confirmPassword: 'pass'
      };
      Chai.request(index)
        .post(`/api/user/reset-password/${userToken}`)
        .send(user)
        .end((err, res) => {
          res.status.should.be.eql(400);
          res.body.errors.should.be.a('string');
        });
      done();
    });


    it('should not be able to reset password without providing [password and confirmPassword field]', (done) => {
      const user = {};
      Chai.request(index)
        .post(`/api/user/reset-password/${userToken}`)
        .send(user)
        .end((err, res) => {
          res.status.should.be.eql(400);
          res.body.errors.should.be.an('array');
        });
      done();
    });

    it('should not reset unconfirmed password', (done) => {
      const user = {
        password: 'Abcde12345',
        confirmPassword: 'Abcde123'
      };
      Chai.request(index)
        .post(`/api/user/reset-password/${userToken}`)
        .send(user)
        .end((err, res) => {
          res.status.should.be.eql(400);
          res.body.errors.should.be.a('string');
        });
      done();
    });

    it('should reset the password', (done) => {
      const user = {
        password: 'Abcde12345',
        confirmPassword: 'Abcde12345'
      };
      Chai.request(index)
        .post(`/api/user/reset-password/${userToken}`)
        .send(user)
        .end((err, res) => {
          res.status.should.be.eql(200);
          res.body.message.should.be.a('string');
        });
      done();
    });
    it('should return an error when user is already verified', (done) => {
      const email = 'sa@andela.com';
      Chai.request(index)
        .post(`/api/verification?token=${config.token}&email=${email}`)
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.message.should.be.equal('Email already Verified.');
          res.status.should.equal(202);
        });
      done();
    });
  });
});
