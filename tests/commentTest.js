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

const newComment = {
  body: 'update'
};
describe('Comment test', () => {
  before('should edit a comment', (done) => {
    chai.request(index)
      .put('/api/comments/articles/1')
      .set('token', userToken)
      .send(newComment)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.eql(200);
      });
    done();
  });
  it('should create a new comment', (done) => {
    const comment = { body: 'this Andela' };
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

  it('should not create a new comment whithout params', (done) => {
    chai.request(index)
      .post('/api/comments/articles/TIA')
      .set('token', userToken)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.eql(400);
      });
    done();
  });

  it('should delete a comment', (done) => {
    chai.request(index)
      .delete('/api/comments/articles/TIA/1')
      .set('token', userToken)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.eql(200);
        res.body.message.should.be.a('string');
      });
    done();
  });
  it('should edit a comment', (done) => {
    chai.request(index)
      .put('/api/comments/articles/1')
      .set('token', userToken)
      .send(newComment)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.eql(200);
      });
    done();
  });
  it('should not edit a comment when there is no comment', (done) => {
    chai.request(index)
      .put('/api/comments/articles/0')
      .set('token', userToken)
      .send(newComment)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.eql(404);
      });
    done();
  });
  it('should get a history of comment', (done) => {
    chai.request(index)
      .get('/api/comments/articles/edit/1')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.eql(200);
        done();
      });
  });
  it('should not get a history of comment', (done) => {
    chai.request(index)
      .get('/api/comments/articles/edit/0')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.eql(404);
      });
    done();
  });
});
