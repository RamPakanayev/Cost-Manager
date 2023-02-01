const mocha = require('mocha');
const { describe, it } = mocha;
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./app');
const should = chai.should();

chai.use(chaiHttp);

describe('Add Cost Endpoint', () => {
  it('should add a cost item to the database', (done) => {
    chai.request(app)
      .post('/addcost')
      .send({
        user_id: '123123',
        year: 2022,
        month: 11,
        day: 20,
        description: 'groceries',
        category: 'food',
        sum: 50
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Cost item added successfully');
        done();
      });
  });
});

describe('Report Endpoint', () => {
  it('should return a detailed report of costs for a specific month and year', (done) => {
    chai.request(app)
      .get('/report')
      .query({
        user_id: '123123',
        year: 2022,
        month: 11
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('food');
        res.body.food.should.be.a('array');
        done();
      });
  });
});

describe('About Endpoint', () => {
  it('should return information about the developers', (done) => {
    chai.request(app)
      .get('/about')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });
});
