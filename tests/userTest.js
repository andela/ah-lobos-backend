import Chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../src/index';

Chai.use(chaiHttp);
Chai.should();


describe('User Routes', () => {
/**
     * signup tests
     */
  before('Before testing user sign-up route sign-up the first user', (done) => {
    const user = {
      username: 'Jack',
      email: 'jack@andela.com',
      password: 'passme'
    };
    Chai.request(index)
      .post('/api/users')
      .send(user)
      .end((err, res) => {
        res.body.should.be.an('object');
      });
    done();
  });
  it('should not register a user with an existing email ', (done) => {
    const user = {
      username: 'Jack',
      email: 'jack@andela.com',
      password: 'passme'
    };
    Chai.request(index)
      .post('/api/users')
      .send(user)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.message.should.equal('user with the same email already exist');
        res.status.should.equal(409);
      });
    done();
  });
  it('should be able to register a new user', (done) => {
    const user = {
      username: 'samuel',
      email: 'sa@andela.com',
      password: 'Password123'
    };
    Chai.request(index)
      .post('/api/users')
      .send(user)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.user.username.should.equal('samuel');
        res.body.user.email.should.equal('sa@andela.com');
        res.body.user.token.should.be.a('string');
        res.status.should.equal(201);
      });
    done();
  });
  it('should allow a user to login', (done) => {
    const user = {
      username: 'samuel',
      email: 'sa@andela.com',
      password: 'Password123'
    };
    Chai.request(index)
      .post('/api/users/login')
      .send(user)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.user.username.should.equal('samuel');
        res.body.user.email.should.equal('sa@andela.com');
        res.body.user.token.should.be.a('string');
        res.status.should.equal(200);
      });
    done();
  });
  it('should not allow a user to login with a wrong password', (done) => {
    const user = {
      username: 'samuel',
      email: 'sa@andela.com',
      password: 'Password12'
    };
    Chai.request(index)
      .post('/api/users/login')
      .send(user)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.message.should.equal('incorrect password');
        res.status.should.equal(401);
      });
    done();
  });
  it('should not allow a user to login if the email provided is wrong', (done) => {
    const user = {
      username: 'samuel',
      email: 'notexist@andela.com',
      password: 'Password123'
    };
    Chai.request(index)
      .post('/api/users/login')
      .send(user)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.message.should.equal('user with email: notexist@andela.com does not exist');
        res.status.should.equal(404);
      });
    done();
  });
});
