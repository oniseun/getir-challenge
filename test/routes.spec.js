/* eslint-disable no-undef */


const request = require('supertest')
const app = require('../src/app')
const { expect } =  require('chai')
const simple = require('simple-mock');
const enums = require('../src/config/enums')
const { StatusCodes } = require('http-status-codes')
const RecordHelper = require('../src/helpers/RecordHelper')
const TIMEOUT = 30000

const testRecords = [
  {
      key: "TAKwGc6Jr4i8Z487",
      createdAt: "2017-01-28T01:22:14.398Z",
      totalCount: 2800
  },
  {
      key: "NAeQ8eX7e5TEg7oH",
      createdAt: "2017-01-27T08:19:14.135Z",
      totalCount: 2900
  }
]

simple.mock(RecordHelper, 'findRecord', () => Promise.resolve(testRecords));


describe('GET /api/v1/info', function() {
    it('responds with 200 status and json', function(done) {
      request(app)
        .get('/api/v1/info')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(StatusCodes.OK)
        .end(function(err, res) {
          expect(res.body).to.have.property('name')
          expect(res.body).to.have.property('version')
          expect(res.body).to.have.property('description')
          expect(res.body).to.have.property('env')
          return done();
        })
    });
  }).timeout(TIMEOUT)

  describe('GET api/v1/ping', function() {
    it('responds with 200 status and true', function(done) {
      request(app)
        .get('/api/v1/ping')
        .set('Accept', 'text/html')
        .expect('Content-Type', /json/)
        .expect(StatusCodes.OK)
        .end(function(err, res) {
          expect(res.text).to.be.equal('Pong !')
          return done();
        })
    });
  }).timeout(TIMEOUT)


describe('POST api/v1/find/record', function() {
  it('Incomplete input, fails with 400 BAD_REQUEST , INVALID_INPUT', function(done) {
    request(app)
      .post('/api/v1/find/record')
      .send({
        endDate: '30004',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(StatusCodes.BAD_REQUEST)
      .end(function(err, res ) {
        expect(res.body).to.have.property('error')
        expect(res.body.msg).to.be.equal(enums.RESPONSE_MSG.INVALID_INPUT)
        if (err) return done(err);
        return done();
      })
  }).timeout(TIMEOUT)
  
  it('Complete Input with invalid payload, fails with 400 BAD_REQUEST , INVALID_INPUT', function(done) {
      request(app)
        .post('/api/v1/find/record')
        .send({
          startDate: '30004',
          endDate: '30004',
          minCount: 'eee0004',
          maxCount: 'xxdwee'
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(StatusCodes.BAD_REQUEST)
        .end(function(err, res ) {
          expect(res.body).to.have.property('error')
          expect(res.body.msg).to.be.equal(enums.RESPONSE_MSG.INVALID_INPUT)
          if (err) return done(err);
          return done();
        })
    }).timeout(TIMEOUT)

    it('Complete Input with valid payload but extra property, fails with 400 BAD_REQUEST , INVALID_INPUT', function(done) {
      request(app)
        .post('/api/v1/find/record')
        .send({
            startDate: "2016-01-26",
            endDate: "2018-02-02",
            minCount: 2700,
            maxCount: 3000,
            extraProp: "extraProp"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(StatusCodes.BAD_REQUEST)
        .end(function(err, res ) {
          expect(res.body).to.have.property('error')
          expect(res.body.msg).to.be.equal(enums.RESPONSE_MSG.INVALID_INPUT)
          if (err) return done(err);
          return done();
        })
    }).timeout(TIMEOUT)

    it('Complete Input with valid payload, returns 200 OK, SUCCESS', function(done) {
      request(app)
        .post('/api/v1/find/record')
        .send({
            startDate: "2016-01-26",
            endDate: "2018-02-02",
            minCount: 2700,
            maxCount: 3000
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(StatusCodes.OK)
        .end(function(err, res ) {
          expect(res.body).to.have.property('records')
          expect(res.body.msg).to.be.equal(enums.RESPONSE_MSG.SUCCESS)
          expect(res.body.records instanceof Array).to.be.true
          if (err) return done(err);
          return done();
        })
    }).timeout(TIMEOUT)

})
