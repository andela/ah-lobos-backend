import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import index from '../src/index';

chai.use(chaiHttp);
chai.should();
chai.expect();
dotenv.config();

const newUserPayload = jwt.sign({
  id: 20,
  username: 'humble58',
  email: 'humble58@gmail.com',
  role: 'admin'
}, process.env.SECRET_JWT_KEY, { expiresIn: '24h' });

const normalUserPayload = jwt.sign({
  id: 20,
  username: 'humble58',
  email: 'humble58@gmail.com',
  role: 'normal'
}, process.env.SECRET_JWT_KEY, { expiresIn: '24h' });

describe('Statistic', () => {
  it('should create the statistic of article', (done) => {
    chai.request(index)
      .post('/api/articles/stats/TIA/save-reading')
      .set('token', newUserPayload)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('message');
        res.status.should.be.equal(201);
      });
    done();
  });

  it('should return the users stats', (done) => {
    chai.request(index)
      .get('/api/users/reading-stats')
      .set('token', normalUserPayload)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(200);
      });
    done();
  });
});
