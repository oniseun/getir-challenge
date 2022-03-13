'use strict'
const pjson = require('../../package.json')
const config = require('../config/config')
const healthchecks = require('../models/healthchecks')

module.exports.info = function(req, res) {
  res.status(200).json({
    name: pjson.name,
    description: pjson.description,
    version: pjson.version,
    env: config.app.env
  })
}

module.exports.ping = function(req, res) {
  res.status(200).send('Pong !')
}

let checks = [
  new healthchecks.ConnectivityHealthCheck(
    'Connectivity',
    `The app can communicate with the outside world, using request: ${config.app.connectivityCheckURL}`
  ),
  new healthchecks.MongoHealthCheck('MongoDb', `Connection to MongoDb`)
]

module.exports.health = function(req, res) {
  let results = checks.map((h) =>
    h.check().then((result) => {
      return {
        status: result,
        name: h.name,
        description: h.description
      }
    })
  )
  return Promise.all(results).then((results) => {
    res.status(200).json({ checks: results })
  })
}
