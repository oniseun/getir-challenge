'use strict'
const axios = require('axios')
const config = require('../config/config')
const mongoose = require('mongoose')
const HEALTHCHECKS = require('../config/enums').HEALTHCHECKS
const LOG_PREFIX = 'HEALTHCHECKS healthchecks.js: '


class HealthCheck {
  constructor(name, description) {
    this.name = name
    this.description = description
  }
  check() {
    return new Promise((resolve) => resolve('Not implemented !!!'))
  }
}

class ConnectivityHealthCheck extends HealthCheck {
  check() {
    return axios.get(config.app.connectivityCheckURL)
      .then((html) => {
        return html ? HEALTHCHECKS.SUCCESS : HEALTHCHECKS.FAILURE
      })
      .catch((err) => {
        console.error(`${LOG_PREFIX} ConnectivityHealthCheck error: ${err}`)
        return HEALTHCHECKS.FAILURE
      })
  }
}

class MongoHealthCheck extends HealthCheck {
  check() {
    return new Promise((resolve) => {
      mongoose.connection.readyState === 1 ? resolve(HEALTHCHECKS.SUCCESS) : resolve(HEALTHCHECKS.FAILURE)
    }).catch((err) => {
      console.error(`${LOG_PREFIX} MongoHealthCheck error: ${err}`)
      return HEALTHCHECKS.FAILURE
    })
  }
}

module.exports.HealthCheck = HealthCheck
module.exports.MongoHealthCheck = MongoHealthCheck
module.exports.ConnectivityHealthCheck = ConnectivityHealthCheck
