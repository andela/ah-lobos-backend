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
  email: 'user@gmail.com'
}, process.env.SECRET_JWT_KEY, { expiresIn: '24h' });


describe('Comment test', () => {
  it('should create a new comment', (done) => {
    const comment = { body: 'this Andela' };
    chai.request(index)
      .post('/api/articles/TIA/comments')
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
      .post('/api/articles/TIA/comments')
      .set('token', userToken)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.eql(400);
      });
    done();
  });

  it('should delete a comment', (done) => {
    chai.request(index)
      .delete('/api/articles/TIA/comments/1')
      .set('token', userToken)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.eql(200);
        res.body.message.should.be.a('string');
      });
    done();
  });
});
