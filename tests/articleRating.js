import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import index from '../src/index';

chai.use(chaiHttp);
chai.should();
chai.expect();
dotenv.config();

const payload = jwt.sign({
  id: 2,
  username: 'domdom58',
  email: 'domdom58@gmail.com'
}, process.env.SECRET_JWT_KEY, { expiresIn: '24h' });

const title = 'ANDELA';
const id = 2;
let generateSlug = `${title} ${id} ${Math.floor(Math.random() * 10000)}`;
while (generateSlug.match(/ /g)) generateSlug = generateSlug.replace(' ', '-');

describe('Rating an Article', () => {
  before('should register a new article', async () => {
    const article = {
      title,
      body: 'This is Andela',
      description: 'My Andela',
      slug: generateSlug.toLowerCase(),
      tagList: ['reactjs', 'angularjs', 'dragons'],
    };
    chai.request(index)
      .post('/api/articles')
      .send(article)
      .set('token', payload)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('article');
        res.body.should.have.property('message');
      });
  });

  const rating = {
    id: 3,
    rating: ''
  };
  const rating2 = {
    id: 3,
    rating: 10
  };
  const rating3 = {
    id: '1',
    rating: '2'
  };

  it('it should not rate article with empty rating', (done) => {
    chai.request(index)
      .post(`/api/articles/${generateSlug.toLowerCase()}/ratings`)
      .send(rating)
      .set('token', payload)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.an('object');
      });
    done();
  });

  it('it should not rate article because rate number greater than 5', (done) => {
    chai.request(index)
      .post(`/api/articles/${generateSlug.toLowerCase()}/ratings`)
      .send(rating2)
      .set('token', payload)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.an('object');
      });
    done();
  });

  it('it should rate an article', (done) => {
    chai.request(index)
      .post(`/api/articles/${generateSlug.toLowerCase()}/ratings`)
      .send(rating3)
      .set('token', payload)
      .end((err, res) => {
        res.body.should.be.an('object');
      });
    done();
  });
});
