import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import index from '../src/index';


chai.use(chaiHttp);
chai.should();
chai.expect();
dotenv.config();

const userToken = jwt.sign({
  id: 3,
  username: 'testUser',
  email: 'user@gmail.com',
  role: 'admin'
}, process.env.SECRET_JWT_KEY, { expiresIn: '24h' });

const userToken1 = jwt.sign({
  id: 1,
  username: 'testUser',
  email: 'test@gmail.com',
  role: 'admin'
}, process.env.SECRET_JWT_KEY, { expiresIn: '24h' });

const like = {
  like: true,
  dislike: false,
  userId: 3,
  commentId: 2
};
const dislike = {
  like: false,
  dislike: true,
  userId: 1,
  commentId: 2
};
describe('like Comment test', () => {
  before('should create a new comment', (done) => {
    const comment = { body: 'this like' };
    chai.request(index)
      .post('/api/comments/articles/TIA')
      .set('token', userToken)
      .send(comment)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.eql(201);
        res.body.should.have.property('message');
      });
    done();
  });
  it('should like a  comment', (done) => {
    chai.request(index)
      .post('/api/comments/like/comment/2')
      .set('token', userToken)
      .send(like)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.eql(201);
        res.body.should.have.property('message');
      });
    done();
  });
  it('should not like a  comment when there is no comment', (done) => {
    chai.request(index)
      .post('/api/comments/like/comment/0')
      .set('token', userToken)
      .send(like)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.eql(404);
        res.body.should.have.property('error');
      });
    done();
  });
  it('should dislike a  comment', (done) => {
    chai.request(index)
      .post('/api/comments/dislike/comment/3')
      .set('token', userToken1)
      .send(dislike)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.eql(201);
        res.body.should.have.property('message');
      });
    done();
  });
});
