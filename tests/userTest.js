import Chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../src/index';

Chai.use(chaiHttp);
Chai.should();

describe('User Tests', () => {
  /**
     * root tests
     */
  it('should be able to see a welcome message', (done) => {
    Chai.request(index)
      .get('/')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.message.should.be.a('string');
        res.status.should.eql(200);
      });
    done();
  });

  /**
     * signup tests
     */
  it('should be able to register a new user', (done) => {
    const user = {
      username: 'Jack',
      email: 'jackson@andela.com',
      password: 'passme'
    };
    Chai.request(index)
      .post('/api/users')
      .send(user)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.user.should.have.property('username');
        res.body.user.should.have.property('email');
        res.status.should.eql(201);
      });
    done();
  });


  it('should not register a user with an existing email ', (done) => {
    const user = {
      username: 'Jack',
      email: 'jackson@andela.com',
      password: 'passme'
    };
    Chai.request(index)
      .post('/api/users')
      .send(user)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.message.should.be.a('string');
        res.status.should.eql(409);
      });
    done();
  });
});
