'use strict'

const validator = require('express-joi-validation').createValidator({ passError: true})

const HealthController = require('./controllers/HealthController')
const RecordController = require('./controllers/RecordController')

const RecordSchema = require('./models/validators/RecordSchema');


module.exports = function(app) {
///////////////////////
// HEALTH CHECK
///////////////////////
app.get('/',        HealthController.info)
app.get('/info',    HealthController.info)
app.get('/ping',    HealthController.ping)
app.get('/health',  HealthController.health)

app.post('/find/record', validator.body(RecordSchema.params), RecordController.findRecord);



}