import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import index from '../src/index';

chai.use(chaiHttp);
chai.should();
dotenv.config();

const userToken = jwt.sign({
  id: 1,
  username: 'testUser',
  email: 'user@gmail.com',
  role: 'admin'
}, process.env.SECRET_JWT_KEY, { expiresIn: '24h' });

const userToken2 = jwt.sign({
  id: 2,
  username: 'nonexist',
  email: 'nonexist@gmail.com',
  role: 'admin'
}, process.env.SECRET_JWT_KEY, { expiresIn: '24h' });

describe('Article test', () => {
  before('should be able to higlight an article', (done) => {
    const higlight = {
      selectFrom: 1,
      selectTo: 3,
      comment: 'This is good'
    };
    chai.request(index)
      .post('/api/articles/highlight/TIA')
      .send(higlight)
      .set('token', userToken)
      .end((err, res) => {
        res.status.should.be.eql(200);
        res.body.highlights.should.have.property('articleSlug');
        done();
      });
  });
  before('should be able to higlight an article', (done) => {
    const higlight = {
      selectFrom: 2,
      selectTo: 3,
      comment: 'This is good'
    };
    chai.request(index)
      .post('/api/articles/highlight/TIA')
      .send(higlight)
      .set('token', userToken)
      .end((err, res) => {
        res.status.should.be.eql(200);
      });
    done();
  });

  it('should be able to higlight an article', (done) => {
    const higlight = {
      selectFrom: 1,
      selectTo: 5,
      comment: 'This is good'
    };
    chai.request(index)
      .post('/api/articles/highlight/TIA')
      .send(higlight)
      .set('token', userToken)
      .end((err, res) => {
        res.status.should.be.eql(200);
      });
    done();
  });

  it('should be able to higlight an article', (done) => {
    const higlight = {
      selectFrom: 1,
      selectTo: 5,
      comment: 'This is good'
    };
    chai.request(index)
      .post('/api/articles/highlight/TIA')
      .send(higlight)
      .set('token', userToken)
      .end((err, res) => {
        res.status.should.be.eql(200);
      });
    done();
  });

  it('should be able to higlight an article', (done) => {
    const higlight = {
      selectFrom: 5,
      selectTo: 1,
      comment: 'This is good'
    };
    chai.request(index)
      .post('/api/articles/highlight/TIA')
      .send(higlight)
      .set('token', userToken)
      .end((err, res) => {
        res.status.should.be.eql(200);
      });
    done();
  });

  it('should be able to get higlighted text for the authenticated user', (done) => {
    chai.request(index)
      .get('/api/articles/user/highlight/')
      .set('token', userToken)
      .end((err, res) => {
        res.status.should.be.eql(200);
        res.body.userHighlightedText.should.be.an('array');
        done();
      });
    // done();
  });

  it('should not be able to get higlighted text for unkown user', (done) => {
    chai.request(index)
      .get('/api/articles/user/highlight/')
      .set('token', userToken2)
      .end((err, res) => {
        res.status.should.be.eql(404);
        res.body.error.should.be.eql('no highlighted text found');
        done();
      });
  });
});
