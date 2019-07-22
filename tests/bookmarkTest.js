import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import index from '../src/index';

chai.use(chaiHttp);
chai.should();

const userToken = jwt.sign({
  id: 1,
  username: 'testUser',
  email: 'user@gmail.com'
}, process.env.SECRET_JWT_KEY, { expiresIn: '24h' });

const userToken1 = jwt.sign({
  id: 2,
  username: 'testUser',
  email: 'user1@gmail.com'
}, process.env.SECRET_JWT_KEY, { expiresIn: '24h' });

describe('Test bookmarks', () => {
  it('Authorised user should be able to bookmark an article', (done) => {
    chai.request(index)
      .post('/api/bookmark/TIA')
      .set('token', userToken)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('message');
        done();
      });
  });

  it('should not be allowed to bookmark the same article', (done) => {
    chai.request(index)
      .post('/api/bookmark/TIA')
      .set('token', userToken)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('message');
        done();
      });
  });
  it('should not allow unauthorised user to get bookmarks', (done) => {
    chai.request(index)
      .get('/api/articles/bookmark')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('message');
        done();
      });
  });
  it('should remove a bookmarked story', (done) => {
    chai.request(index)
      .delete('/api/bookmark/bookmark-it')
      .set('token', userToken)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('message');
        done();
      });
  });
  it('user should get all stories he/she bookmarked', (done) => {
    chai.request(index)
      .get('/api/articles/bookmark')
      .set('token', userToken)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('data');
        done();
      });
  });
  it('should return the story is not found when that story does not exist', (done) => {
    chai.request(index)
      .delete('/api/bookmark/book')
      .set('token', userToken)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('error');
        done();
      });
  });

  it('should get a message when a user tries to fetch empty bookmarked articles', (done) => {
    chai.request(index)
      .get('/api/articles/bookmark')
      .set('token', userToken1)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('message');
        done();
      });
  });
});
