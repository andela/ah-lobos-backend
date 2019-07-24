import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import index from '../src/index';


chai.use(chaiHttp);
chai.should();
chai.expect();
dotenv.config();

const newUserToken = jwt.sign({
  id: 1,
  username: 'tester58',
  email: 'newreporter@gmail.com',
  role: 'admin'
}, process.env.SECRET_JWT_KEY, { expiresIn: '24h' });

const reportOne = {
  message: ''
};
const reportTwo = {
  message: 'This article violate terms of agreement'
};

describe('Reporting article Test', () => {
  it('should not report an article with empty message', (done) => {
    chai.request(index)
      .post('/api/report/articles/TIA')
      .set('token', newUserToken)
      .set('Content-Type', 'application/json')
      .send(reportOne)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(400);
      });
    done();
  });

  it('should report an article with message', (done) => {
    chai.request(index)
      .post('/api/report/articles/TIA')
      .set('token', newUserToken)
      .set('Content-Type', 'application/json')
      .send(reportTwo)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(201);
        res.body.should.have.property('message');
      });
    done();
  });

  it('should return all reported articles by an admin', (done) => {
    chai.request(index)
      .get('/api/report/articles')
      .set('token', newUserToken)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(200);
      });
    done();
  });
});
