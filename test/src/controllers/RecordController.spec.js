const assert = require('chai').assert;
const Promise = require('bluebird');
const simple = require('simple-mock');
const RecordController = require('../../../src/controllers/RecordController');
const RecordHelper = require('../../../src/helpers/RecordHelper')

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


describe('RecordController ', function () {

    describe('methodTests', function () {

        before((done) => {

            simple.mock(RecordHelper, 'findRecord', () => Promise.resolve(testRecords));

            done();
        });

        afterEach(function (done) {
            simple.restore();
            done();
        });

        it('should return success with testRecords', async function () {
            const req = {
                body: {
                    startDate: "2016-01-26",
                    endDate: "2018-02-02",
                    minCount: 2700,
                    maxCount: 3000,
                }
            }

            const res = {
                send: function(data){ 
                    return data
                },
                json: function(json){
                    return json
                },
                status: function(responseStatus) {
                    return this; 
                }
            }
            const response = await RecordController.findRecord(req, res);

            const { code, msg, records } = response;
            assert.equal(code, 0);
            assert.equal(msg, "SUCCESS");
            assert.equal(records.length, 2);
        });


    });

});
