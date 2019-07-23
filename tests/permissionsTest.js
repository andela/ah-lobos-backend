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
  id: 1,
  username: 'testUser',
  email: 'user@gmail.com',
  role: 'admin'
}, process.env.SECRET_JWT_KEY, { expiresIn: '24h' });

describe('Roles and permissions tests', () => {
  it('should allow admin to create role and permissions', (done) => {
    const data = {
      role: 'test',
      action: 'Patch',
      resources: ['Articles', 'Users']
    };

    chai.request(index)
      .post('/api/users/permissions')
      .send(data)
      .set('token', userToken)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('role');
        res.body.should.have.property('resources');
        res.body.should.have.property('action');
        res.body.resources.should.be.an('array');
      });
    done();
  });

  it('should allow admin to change permissions', (done) => {
    const data = {
      resources: ['Articles', 'Users', 'Tags']
    };

    chai.request(index)
      .put('/api/users/permissions/1')
      .send(data)
      .set('token', userToken)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('role');
        res.body.should.have.property('on');
        res.body.should.have.property('access');
        res.body.on.should.be.an('array');
      });
    done();
  });
});
