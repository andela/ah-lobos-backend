import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import index from '../src/index';

chai.use(chaiHttp);
chai.should();
chai.expect();
dotenv.config();

const userToken = jwt.sign({
  id: 1,
  username: 'testUser',
  email: 'test@gmail.com',
  role: 'normal'
}, process.env.SECRET_JWT_KEY, { expiresIn: '24h' });
describe('Fetch Rating Routes', () => {
  it('should be able to register a new rate', (done) => {
    const rate = {
      id: '1',
      rating: '3'
    };
    chai.request(index)
      .post('/api/articles/TIA/ratings')
      .set('token', userToken)
      .send(rate)
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.should.be.a('object');
        done();
      });
  });
  it('it should fetch a rating of an article', (done) => {
    chai.request(index)
      .get('/api/articles/ratings/1')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.be.a('object');
      });
    done();
  });
  // it('it should not fetch a rating when there is no rate', (done) => {
  //   chai.request(index)
  //     .get('/api/ratings/1/?page=4&pageSize=0')
  //     .end((err, res) => {
  //       console.log(res.body);
  //       res.status.should.equal(404);
  //       res.body.should.be.a('object');
  //     });
  //   done();
  // });
  it('it should not fetch a rating when there is no article', (done) => {
    chai.request(index)
      .get('/api/articles/ratings/0/?page=4&pageSize=9')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
      });
    done();
  });
});
