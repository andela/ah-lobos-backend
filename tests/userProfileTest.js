import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
import index from '../src/index';


dotenv.config();


chai.use(chaiHttp);
chai.should();
chai.expect();

const payload = {
  username: 'Amoaben',
  email: 'amoaben@andela.com'
};

const payload1 = {
  username: 'Annor',
  email: 'annor@andela.com'
};

const token = jwt.sign(payload, process.env.SECRET_JWT_KEY, { expiresIn: '24h' });
const token1 = jwt.sign(payload1, process.env.SECRET_JWT_KEY, { expiresIn: '24h' });

describe('User Profile', () => {
  before('Before testing user view/update profile, sign-up and verify two users', (done) => {
    const user = {
      username: 'Amoaben',
      email: 'amoaben@andela.com',
      password: 'Amoaben58'
    };
    const user1 = {
      username: 'Annor',
      email: 'annor@andela.com',
      password: 'Annor1957'
    };
    const userUp = {
      isVerified: true
    };
    const userUp1 = {
      isVerified: true
    };
    chai.request(index)
      .post('/api/users')
      .send(user)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.equal(201);
      });
    chai.request(index)
      .post('/api/users')
      .send(user1)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.equal(201);
      });
    chai.request(index)
      .put('/api/profiles/Amoaben')
      .set('token', `${token}`)
      .send(userUp)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.equal(200);
      });
    chai.request(index)
      .put('/api/profiles/Annor')
      .set('token', `${token1}`)
      .send(userUp1)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.equal(200);
        done();
      });
  });

  it('A user should be able to view his or her profile', (done) => {
    chai.request(index)
      .get('/api/profile/Amoaben')
      .set('token', `${token}`)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.equal(200);
        res.body.profile.username.should.equal('Amoaben');
      });
    done();
  });

  it('A user should be able to view another users profile', (done) => {
    chai.request(index)
      .get('/api/profile/Annor')
      .set('token', `${token}`)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.equal(200);
        res.body.profile.username.should.equal('Annor');
      });
    done();
  });

  it('A user should be not be able to view users that do not exist', (done) => {
    chai.request(index)
      .get('/api/profile/NotExist')
      .set('token', `${token}`)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.equal(404);
        res.body.message.should.equal('user with that email does not exist');
      });
    done();
  });

  it('A user should be able to update his or her profile', (done) => {
    const user = {
      bio: 'Senior Software Engineer'
    };
    chai.request(index)
      .put('/api/profiles/Amoaben')
      .set('token', `${token}`)
      .send(user)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.equal(200);
        res.body.user.bio.should.equal('Senior Software Engineer');
        done();
      });
  });

  it('A user should be able to update his or her profile image', (done) => {
    chai.request(index)
      .put('/api/profiles/Amoaben')
      .set('token', `${token}`)
      .attach('image', fs.readFileSync(`${__dirname}/mock/sam.jpg`), 'sam.jpg')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.equal(200);
        res.body.user.image.should.be.a('string');
        done();
      });
  });

  it('A user should be able to maintain user info if it is not provided', (done) => {
    const user = {
      email: ''
    };
    chai.request(index)
      .put('/api/profiles/Amoaben')
      .set('token', `${token}`)
      .send(user)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.equal(200);
        res.body.user.email.should.equal('amoaben@andela.com');
        done();
      });
  });

  it('A user should be not able to update his or her profile without logging in', (done) => {
    const user = {
      bio: 'Senior Software Engineer'
    };
    chai.request(index)
      .put('/api/profiles/Amoaben')
      .send(user)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.message.should.equal('unauthorized');
        res.status.should.equal(401);
        done();
      });
  });

  it('User two should be not able to update user one profile', (done) => {
    const user = {
      bio: 'Senior Software Engineer'
    };
    chai.request(index)
      .put('/api/profiles/Amoaben')
      .set('token', `${token1}`)
      .send(user)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.message.should.equal('Forbidden access');
        res.status.should.equal(403);
        done();
      });
  });
});
