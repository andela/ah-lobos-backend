import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import index from '../src/index';

chai.use(chaiHttp);
chai.should();

const userToken = jwt.sign({
  id: 1,
  username: 'testUser',
  email: 'test@gmail.com',
  role: 'admin'
}, process.env.SECRET_JWT_KEY, { expiresIn: '24h' });

describe('Test Admin routes', () => {
  it('should be able to create new user', (done) => {
    const user = {
      firstName: 'Admin',
      lastName: 'Admin',
      username: 'Admin',
      email: 'admin@haven.com',
      password: 'Regedit56',
      role: 'admin'
    };
    chai.request(index)
      .post('/api/admin/users')
      .set('token', userToken)
      .send(user)
      .end((err, res) => {
        res.body.should.be.an('object');
        done();
      });
  });
  it('should be able to get all users', (done) => {
    chai.request(index)
      .get('/api/admin/users')
      .set('token', userToken)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('users');
        done();
      });
  });
});
