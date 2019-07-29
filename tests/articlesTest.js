import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import fs from 'fs';
import model from '../src/db/models/index';
import index from '../src/index';

const { Tag } = model;

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

const userToken2 = jwt.sign({
  id: 2,
  username: 'test',
  email: 'user@gmail.com',
  role: 'normal'
}, process.env.SECRET_JWT_KEY, { expiresIn: '24h' });

const tag = {
  tag: 'reactjs',
  tagCount: 1
};
before('it should create a new tag', async () => {
  await Tag.create(tag);
});
describe('Article test', () => {
  it('should create a new article', (done) => {
    chai.request(index)
      .post('/api/articles')
      .set('token', userToken)
      .set('Content-Type', 'application/json')
      .field('title', 'TIA')
      .field('body', 'This is Africa')
      .field('description', 'Sample text')
      .field('tagList', 'reactjs, angularjs')
      .attach('image', fs.readFileSync(`${__dirname}/mock/sam.jpg`), 'sam.jpg')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.eql(201);
        res.body.should.have.property('article');
        res.body.article.should.have.property('image');
      });
    done();
  });
  it('should create a new article with no tag', (done) => {
    chai.request(index)
      .post('/api/articles')
      .set('token', userToken)
      .set('Content-Type', 'application/json')
      .field('title', 'TIA')
      .field('body', 'This is Africa')
      .field('description', 'Sample text')
      .attach('image', fs.readFileSync(`${__dirname}/mock/sam.jpg`), 'sam.jpg')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.eql(201);
        res.body.should.have.property('article');
        res.body.article.should.have.property('image');
      });
    done();
  });

  it('should not delete an article without authentication', (done) => {
    chai.request(index)
      .delete('/api/articles/articles')
      .set('token', 'invalid token')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.equal(401);
        res.body.message.should.be.a('string');
      });
    done();
  });

  it('should create another article', (done) => {
    const article = {
      title: 'TIA',
      body: 'This is Africa',
      description: 'Sample text',
      tagList: 'dragons,Tech'
    };

    chai.request(index)
      .post('/api/articles')
      .send(article)
      .set('token', userToken)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('article');
        res.body.should.have.property('message');
      });
    done();
  });

  it('should not delete an article which is not yours', (done) => {
    chai.request(index)
      .delete('/api/articles/TIA')
      .set('token', userToken2)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.message.should.be.equal('you are not allowed to perfom this action');
      });
    done();
  });

  it('should display all articles', (done) => {
    chai.request(index)
      .get('/api/articles')
      .set('token', userToken)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.articles.should.be.an('array');
      });
    done();
  });

  it('should display a specific articles', (done) => {
    chai.request(index)
      .get('/api/articles/TIA')
      .set('token', userToken)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('article');
        res.body.article.should.be.an('object');
      });
    done();
  });

  it('should update an existing article', (done) => {
    const article = {
      title: 'This is wonderful',
      body: 'This is Africa',
      description: 'Sample text',
      tagList: ['reactjs', 'angularjs', 'ragonsss']
    };
    chai.request(index)
      .put('/api/articles/dropTIA')
      .send(article)
      .set('token', userToken)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('article');
        res.status.should.be.eql(200);
      });
    done();
  });

  it('should update the image of an existing article', (done) => {
    chai.request(index)
      .put('/api/articles/dropTIA')
      .attach('image', fs.readFileSync(`${__dirname}/mock/sam.jpg`), 'sam.jpg')
      .set('token', userToken)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('article');
        res.body.article.should.have.property('image');
        res.body.article.image.should.be.a('string');
        res.status.should.be.eql(200);
      });
    done();
  });

  it('should update an existing article', (done) => {
    const article = {};
    chai.request(index)
      .put('/api/articles/dropTIA')
      .send(article)
      .set('token', userToken)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('article');
        res.status.should.be.eql(200);
      });
    done();
  });

  it('should delete an article', (done) => {
    chai.request(index)
      .delete('/api/articles/dropTIA')
      .set('token', userToken)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.message.should.be.a('string');
      });
    done();
  });
  it('should like the article', (done) => {
    chai.request(index)
      .post('/api/articles/like/like-africa')
      .set('token', userToken)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('liked');
        res.body.should.have.property('disliked');
        res.body.liked.should.equal(true);
      });
    done();
  });
  it('should return an error without page and pagesize', (done) => {
    chai.request(index)
      .get('/api/articles/?page=page&pageSize=pagination')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.equal(500);
      });
    done();
  });

  it('Should not share an invalid article', (done) => {
    chai.request(index)
      .get('/api/articles/TIA-588/facebook-share')
      .set('token', userToken)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(404);
        done();
      });
  });

  it('Should post an article on facebook', (done) => {
    chai.request(index)
      .get('/api/articles/TIA/facebook-share')
      .set('token', userToken)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(200);
        done();
      });
  });

  it('Should share an article on email', (done) => {
    chai.request(index)
      .get('/api/articles/TIA/email-share')
      .set('token', userToken)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(200);
        done();
      });
  });

  it('Should share an article on twitter', (done) => {
    chai.request(index)
      .get('/api/articles/TIA/twitter-share')
      .set('token', userToken)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(200);
        done();
      });
  });

  it('Should post an article on whatsapp', (done) => {
    chai.request(index)
      .get('/api/articles/TIA/whatsapp-share')
      .set('token', userToken)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(200);
        done();
      });
  });
});
