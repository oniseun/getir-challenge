'use strict'

const validator = require('express-joi-validation').createValidator({ passError: true})

const HealthController = require('./controllers/HealthController')
const RecordController = require('./controllers/RecordController')

const RecordSchema = require('./models/validators/RecordSchema');


module.exports = function(app) {
///////////////////////
// HEALTH CHECK
///////////////////////
app.get('/api/v1/',        HealthController.info)
app.get('/api/v1/info',    HealthController.info)
app.get('/api/v1/ping',    HealthController.ping)
app.get('/api/v1/health',  HealthController.health)

app.post('/api/v1/find/record', validator.body(RecordSchema.body), RecordController.findRecord);



}