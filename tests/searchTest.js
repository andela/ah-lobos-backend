import chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../src/index';

chai.use(chaiHttp);
chai.should();
chai.expect();

describe('Search functionality for Author Haven', () => {
  it('A user should be able to search for an article by an authors name', (done) => {
    chai.request(index)
      .post('/api/articles/search/?author=rafiki')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.articles[0].author.username.should.equal('rafiki');
        res.status.should.equal(200);
        done();
      });
  });
  it('A user should be able to search for an article by title', (done) => {
    chai.request(index)
      .post('/api/articles/search/?title=Return of the Mack')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.articles[0].title.should.equal('Return of the Mack');
        res.status.should.equal(200);
        done();
      });
  });
  it('A user should be able to search for an article by description', (done) => {
    chai.request(index)
      .post('/api/articles/search/?description=single')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.articles[0].description.should.equal('single');
        res.status.should.equal(200);
        done();
      });
  });
  it('A user should be able to search for an article by a portion of the body', (done) => {
    chai.request(index)
      .post('/api/articles/search/?body=is a 1977 single by the Bee Gees')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.articles[0].body.should.equal('How Deep Is Your Love, is a 1977 single by the Bee Gees. Originally intended for singer Yvonne Elliman, their request was declined and the Bee Gees decided to sing it themselves.');
        res.status.should.equal(200);
        done();
      });
  });
  it('A user should be able to search for an article by a combination of author name, title, body and description', (done) => {
    chai.request(index)
      .post('/api/articles/search/?body=love&title=how deep&description=disco&author=slick')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.equal(200);
        res.body.articles.should.be.an('array');
        res.body.articles.length.should.be.equal(3);
        done();
      });
  });
  it('A user should be able to search for an article by tag', (done) => {
    chai.request(index)
      .post('/api/articles/search/?tag=morrison')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.equal(200);
        res.body.articles.should.be.an('array');
        res.body.articles[0].title.should.equal('Return of the Mack');
        done();
      });
  });
  it('A user should get an error message if their query is not found', (done) => {
    chai.request(index)
      .post('/api/articles/search/?author=error message')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.message.should.equal('There are no search results for your query');
        res.status.should.equal(404);
        done();
      });
  });
});
