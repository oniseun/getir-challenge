'use strict'
const app = require('./app')
const utils = require('./utils/utils')
const config = require('./config/config')

utils.connectToMongo().then(() => {
  app.listen(config.app.port, function() {
    console.warn(`APP STARTED AS: ${config.app.env}, listening on port: ${config.app.port}`)
    console.warn('=========================================================================\n')
  })
})
