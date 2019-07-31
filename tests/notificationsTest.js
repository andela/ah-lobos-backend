import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import dotenv from 'dotenv';
import index from '../src/index';

chai.use(chaiHttp);
chai.should();
chai.expect();
dotenv.config();

const userToken1 = jwt.sign({
  id: 4,
  username: 'rafiki',
  email: 'rafiki@gmail.com',
  role: 'admin'
}, process.env.SECRET_JWT_KEY, { expiresIn: '24h' });

const userToken2 = jwt.sign({
  id: 5,
  username: 'mufasa',
  email: 'mufasa@gmail.com',
  role: 'admin'
}, process.env.SECRET_JWT_KEY, { expiresIn: '24h' });

const userToken3 = jwt.sign({
  id: 9,
  username: 'akpalo',
  email: 'akpalo@gmail.com',
  role: 'admin'
}, process.env.SECRET_JWT_KEY, { expiresIn: '24h' });

describe('User notifications', () => {
  it('A user should be able to get all notifications', (done) => {
    chai.request(index)
      .get('/api/notifications')
      .set('token', userToken1)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.be.an('object');
        done();
      });
  });
  it('A user should be notified if they have no notifications', (done) => {
    chai.request(index)
      .get('/api/notifications')
      .set('token', userToken3)
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.should.be.an('object');
        res.body.message.should.equal('You are all caught up, you have zero notifications');
        done();
      });
  });
  it('A user should be able to update his or her notification preference', (done) => {
    const config = {
      inApp: true,
      email: false
    };
    chai.request(index)
      .put('/api/notifications/config')
      .set('token', userToken2)
      .send(config)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.be.an('object');
        res.body.config.userId.should.equal(5);
        done();
      });
  });
  it('A user should not be able to update his or her notification preference if the right inputs are not provided', (done) => {
    const config = {
      inApp: 't',
      email: 'f'
    };
    chai.request(index)
      .put('/api/notifications/config')
      .set('token', userToken2)
      .send(config)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.an('object');
        res.body.Errors.should.be.an('array');
        res.body.Errors[0].should.equal(' inApp  must be a boolean');
        done();
      });
  });
  it('All users should be notified when an author they follow creates an article', (done) => {
    chai.request(index)
      .post('/api/articles')
      .set('token', userToken1)
      .set('Content-Type', 'application/json')
      .field('title', 'Jungle King')
      .field('body', 'The Lion is King')
      .field('description', 'All animals know this')
      .attach('image', fs.readFileSync(`${__dirname}/mock/sam.jpg`), 'sam.jpg')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(201);
        res.body.should.have.property('article');
        res.body.article.should.have.property('image');
      });
    done();
  });
  it('An author should be notified when a comment is made on his or her article', (done) => {
    const comment = { body: 'Good job rafiki' };
    chai.request(index)
      .post('/api/comments/articles/stay-alive')
      .set('token', userToken2)
      .send(comment)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.eql(201);
        res.body.should.have.property('message');
      });
    done();
  });
  it('An author should be notified when his or her article is liked', (done) => {
    chai.request(index)
      .post('/api/articles/like/stay-alive')
      .set('token', userToken2)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('liked');
        res.body.should.have.property('disliked');
        res.body.liked.should.equal(true);
      });
    done();
  });
  it('An author should be notified when his or her article is disliked', (done) => {
    chai.request(index)
      .post('/api/articles/dislike/stay-alive')
      .set('token', userToken2)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('liked');
        res.body.should.have.property('disliked');
        res.body.disliked.should.equal(true);
      });
    done();
  });
});
