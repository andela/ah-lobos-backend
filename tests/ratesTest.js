import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import index from '../src/index';


chai.use(chaiHttp);
chai.should();
chai.expect();
dotenv.config();


describe('Fetch Rating Routes', () => {
  before('should be able to register a new rate', async () => {
    const res = await chai.request(index).post('/api/users/login')
      .set('Content-Type', 'application/json')
      .send({
        username: 'test',
        email: 'user@gmail.com',
        password: 'Password12345'
      });
    const rate = {
      id: '1',
      rating: '3'
    };
    await chai.request(index).post('/api/articles/TIA/ratings')
      .set('token', res.body.user.token)
      .send(rate);
  });
  it('it should fetch a rating of an article', (done) => {
    chai.request(index)
      .get('/api/ratings/1')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.be.a('object');
      });
    done();
  });
});
