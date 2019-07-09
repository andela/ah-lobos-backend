import chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../src/index';

chai.use(chaiHttp);
chai.should();
const { expect } = chai;

describe('test all social login', () => {
  it('should be able to login with google account', (done) => {
    chai.request(index)
      .post('/login/google/test')
      .send({
        id: '45673450',
        email: 'juliushirwaa@gmail.com'
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
      });
    done();
  });

  it('should save a user logged in with google account, test', (done) => {
    chai.request(index)
      .post('/login/google/test')
      .send({
        id: '45673451',
        email: 'juliushirwaj@gmail.com'
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
      });
    done();
  });

  it('should let a user login with facebook with test route', (done) => {
    chai.request(index)
      .post('/login/facebook/test')
      .send({
        id: '456734543',
        email: 'juliushirwaty@yahoo.fr'
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
      });
    done();
  });

  it('should save a user logged in with facebook account, test', (done) => {
    chai.request(index)
      .post('/login/facebook/test')
      .send({
        id: '45673454356',
        email: 'juliushirwaty@yahoo.fr'
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
      });
    done();
  });

  it('should let a user login with twitter with test route', (done) => {
    chai.request(index)
      .post('/login/twitter/test')
      .send({
        id: '56645676543345',
        email: 'juliushirwatwitter@yahoo.fr'
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
      });
    done();
  });

  it('should save a user logged in with twitter account, test', (done) => {
    chai.request(index)
      .post('/login/twitter/test')
      .send({
        id: '56645676543345',
        email: 'juliushirwatwitter@yahoo.fr'
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
      });
    done();
  });
});
