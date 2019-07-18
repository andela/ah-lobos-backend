import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import index from '../src/index';

chai.use(chaiHttp);
chai.should();
chai.expect();
dotenv.config();

const userToken1 = jwt.sign({
  id: 4,
  username: 'rafiki',
  email: 'rafiki@gmail.com'
}, process.env.SECRET_JWT_KEY, { expiresIn: '24h' });

const userToken2 = jwt.sign({
  id: 5,
  username: 'mufasa',
  email: 'mufasa@gmail.com',
}, process.env.SECRET_JWT_KEY, { expiresIn: '24h' });

const userToken3 = jwt.sign({
  id: 9,
  username: 'akpalo',
  email: 'akpalo@gmail.com',
}, process.env.SECRET_JWT_KEY, { expiresIn: '24h' });

describe('Follow/Unfollow test', () => {
  it('A user should be able to follow another user', (done) => {
    chai.request(index)
      .post('/api/profiles/slick/follow')
      .set('token', userToken2)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.message.should.equal('user followed successfully');
        res.body.user.username.should.equal('slick');
        res.status.should.equal(200);
        done();
      });
  });
  it('A user should not be able to follow another user twice', (done) => {
    chai.request(index)
      .post('/api/profiles/rafiki/follow')
      .set('token', userToken2)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.message.should.equal('you are already following this user');
        res.status.should.equal(409);
        done();
      });
  });
  it('A user should not be able to follow themselves', (done) => {
    chai.request(index)
      .post('/api/profiles/mufasa/follow')
      .set('token', userToken2)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.message.should.equal('you can not follow yourself');
        done();
      });
  });
  it('A user should not be able to unfollow a user that does not exist', (done) => {
    chai.request(index)
      .delete('/api/profiles/snowwhite/unfollow')
      .set('token', userToken1)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.message.should.equal('user does not exist');
        done();
      });
  });
  it('A user should be able to unfollow another user', (done) => {
    chai.request(index)
      .delete('/api/profiles/mufasa/unfollow')
      .set('token', userToken1)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.message.should.equal('user unfollowed successfully');
        res.body.user.username.should.equal('mufasa');
        done();
      });
  });
  it('A user should not be able to unfollow a user they do not follow', (done) => {
    chai.request(index)
      .delete('/api/profiles/nzube/unfollow')
      .set('token', userToken1)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.message.should.equal('you can not unfollowing a user you are not following');
        res.status.should.equal(404);
        done();
      });
  });
  it('A user should be able to view the users he/she follows', (done) => {
    chai.request(index)
      .get('/api/profiles/followees')
      .set('token', userToken1)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.equal(200);
        res.body.followees.should.be.an('array');
        done();
      });
  });
  it('A user should get a message - You are not following anyone yet - if they are not following anyone', (done) => {
    chai.request(index)
      .get('/api/profiles/followees')
      .set('token', userToken3)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.message.should.equal('You are not following anyone yet');
        done();
      });
  });
  it('A user should be able to view their followers', (done) => {
    chai.request(index)
      .get('/api/profiles/followers')
      .set('token', userToken1)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.equal(200);
        res.body.followers.should.be.an('array');
        done();
      });
  });
  it('A user should get a message - You are not following anyone yet - if they do not have any followers', (done) => {
    chai.request(index)
      .get('/api/profiles/followers')
      .set('token', userToken3)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.message.should.equal('You have zero(0) followers');
        done();
      });
  });
});
