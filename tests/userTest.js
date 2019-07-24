import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import index from '../src/index';
import config from '../src/db/config/envirnoment';
import deleteBlacklist from '../src/helpers/deleteBlacklistTokens';
import logout from '../src/middlewares/logout';


const tokenTest = jwt.sign({
  username: 'Manzi',
  email: 'manzif60@andela.com',
  role: 'admin'
}, process.env.SECRET_JWT_KEY);


chai.use(chaiHttp);
chai.should();
chai.expect();
dotenv.config();
const { expect } = chai.expect;

const userToken = jwt.sign({
  id: 1,
  username: 'testUser',
  email: 'test@gmail.com',
  role: 'admin'
}, process.env.SECRET_JWT_KEY, { expiresIn: '24h' });

describe('User Routes', () => {
  it('should not register a user with an existing email ', (done) => {
    const user = {
      firstName: 'test',
      lastName: 'test',
      username: 'testUser',
      email: 'test@gmail.com',
      password: 'Domdom58'
    };
    chai.request(index)
      .post('/api/users')
      .send(user)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.equal(409);
      });
    done();
  });

  before('should return user verified when he click the link from email', (done) => {
    const email = 'test@gmail.com';
    chai.request(index)
      .post(`/api/users/verification?token=${config.token}&email=${email}`)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.equal(403);
      });
    done();
  });

  it('it should delete an expired token from blacklisttoken table', (done) => {
    deleteBlacklist();
    done();
  });

  it('should not register a new user with empty body', (done) => {
    const user = {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: ''
    };
    chai.request(index)
      .post('/api/users')
      .send(user)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.an('object');
      });
    done();
  });

  it('should not register a user with invalid email', (done) => {
    const user = {
      username: 'Jack',
      email: 'jacksonandela.com',
      password: 'Domdom58'
    };
    chai.request(index)
      .post('/api/users')
      .send(user)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.an('object');
      });
    done();
  });

  it('should return user verified when he click the link from email', (done) => {
    const email = 'sam@andela.com';
    chai.request(index)
      .post(`/api/users/verification?token=${config.token}&email=${email}`)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.equal(403);
      });
    done();
  });

  it('should allow a user to login', (done) => {
    const user = {
      email: 'user@gmail.com',
      password: 'Password12345'
    };
    chai.request(index)
      .post('/api/users/login')
      .send(user)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.user.username.should.be.a('string');
        res.body.user.email.should.be.a('string');
        res.body.user.token.should.be.a('string');
        res.status.should.equal(200);
      });
    done();
  });

  it('should not allow a user to login with a wrong password', (done) => {
    const user = {
      email: 'user@gmail.com',
      password: 'Password1234'
    };
    chai.request(index)
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
    chai.request(index)
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
    chai.request(index)
      .post('/api/users/forgot-password')
      .send(user)
      .end((err, res) => {
        res.status.should.be.equal(400);
        res.body.error.should.be.an('string');
      });
    done();
  });

  it('should not reset the password with a weak password', (done) => {
    const user = {
      password: 'pass',
      confirmPassword: 'pass'
    };
    chai.request(index)
      .post(`/api/users/reset-password/${userToken}`)
      .send(user)
      .end((err, res) => {
        res.status.should.be.equal(400);
        res.body.errors.should.be.a('string');
      });
    done();
  });

  it('should send a reset password link to a user\'s email', (done) => {
    const user = {
      email: 'test@gmail.com',
    };
    chai.request(index)
      .post('/api/users/forgot-password')
      .send(user)
      .end((err, res) => {
        res.status.should.be.equal(200);
        res.body.message.should.be.a('string');
      });
    done();
  });


  it('should not be able to reset password without providing [password and confirmPassword field]', (done) => {
    const user = {};
    chai.request(index)
      .post(`/api/users/reset-password/${userToken}`)
      .send(user)
      .end((err, res) => {
        res.status.should.be.equal(400);
        res.body.errors.should.be.an('array');
      });
    done();
  });

  it('should not reset unconfirmed password', (done) => {
    const user = {
      password: 'Abcde12345',
      confirmPassword: 'Abcde123'
    };
    chai.request(index)
      .post(`/api/users/reset-password/${userToken}`)
      .send(user)
      .end((err, res) => {
        res.status.should.be.equal(400);
        res.body.errors.should.be.a('string');
      });
    done();
  });

  it('should reset the password', (done) => {
    const user = {
      password: 'Abcde12345',
      confirmPassword: 'Abcde12345'
    };
    chai.request(index)
      .post(`/api/users/reset-password/${userToken}`)
      .send(user)
      .end((err, res) => {
        res.status.should.be.equal(200);
        res.body.message.should.be.a('string');
      });
    done();
  });
  it('should not send reset password link using invalid email', (done) => {
    const user = {
      email: 'never#andela.com',
    };
    chai.request(index)
      .post('/api/users/forgot-password')
      .send(user)
      .end((err, res) => {
        res.status.should.be.eql(400);
        res.body.error.should.be.an('string');
      });
    done();
  });

  it('should send a reset password link to a user\'s email', (done) => {
    const user = {
      email: 'test@gmail.com',
    };
    chai.request(index)
      .post('/api/users/forgot-password')
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
    chai.request(index)
      .post(`/api/users/reset-password/${userToken}`)
      .send(user)
      .end((err, res) => {
        res.status.should.be.eql(400);
        res.body.errors.should.be.a('string');
      });
    done();
  });


  it('should not be able to reset password without providing [password and confirmPassword field]', (done) => {
    const user = {};
    chai.request(index)
      .post(`/api/users/reset-password/${userToken}`)
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
    chai.request(index)
      .post(`/api/users/reset-password/${userToken}`)
      .send(user)
      .end((err, res) => {
        res.status.should.be.eql(400);
        res.body.errors.should.be.a('string');
      });
    done();
  });
  it('should return an error when user is already verified', (done) => {
    const email = 'sa@andela.com';
    chai.request(index)
      .post(`/api/users/verification?token=${config.token}&email=${email}`)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.message.should.be.equal('Email already Verified.');
        res.status.should.equal(202);
      });
    done();
  });

  it('it should log out with a token ', (done) => {
    chai.request(index)
      .post('/api/users/logout')
      .set('token', tokenTest)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.message.should.be.a('string');
        expect(logout.logoutToken).toHaveBeenCalledTimes(1);
      });
    done();
  });

  it('it should log out with a token ', (done) => {
    chai.request(index)
      .post('/api/users/logout')
      .set('token', tokenTest)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.message.should.be.a('string');
        expect(logout.logoutToken).toHaveBeenCalledTimes(1);
      });
    done();
  });
});
