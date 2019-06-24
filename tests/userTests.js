import chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../index';

chai.use(chaiHttp);
chai.should();

describe('users tests', () => {
    // user signup
    it('should be able to register a new user', (done) => {
        const user = {
            "username": "Jack8",
            "email": "jackson8@andela.com",
            "password": "passme"
        }
        chai.request(index)
        .post('/api/users')
        .send(user)
        .end((err, res) => {
            res.body.should.be.an('object');
            res.body.user.should.have.property('username');
            res.body.user.should.have.property('email');
            res.status.should.eql(200);
        });
        done();
    });
    
    // userr login
    it('should be able to login', (done) => {
        const user = {
            "email": "jackson5@andela.com",
            "password": "passme"
        }
        chai.request(index)
        .post('/api/users/login')
        .send(user)
        .end((err, res) => {
            res.body.should.be.an('object');
            res.body.user.should.have.property('username');
            res.body.user.should.have.property('email');
            res.status.should.eql(200);
        });
        done();
    });
});

