'use strict'
const config = require('../config/config')
const mongoose = require('mongoose')
const bluebird = require('bluebird');
mongoose.Promise = bluebird

const mongoUri = config.db.url
const mongoOptions = config.db.options || {}
module.exports.connectToMongo = async () => {
  return new Promise((resolve, reject) => {
    console.warn('=========================================================================')
    console.warn(`DB-INIT: connecting to mongo: `)
    mongoose.connect(mongoUri, mongoOptions, function(error) {
      if (error) {
        console.error('DB-INIT: Connection to mongo: ko !!! ' + error)
        reject(error)
      } else {
        console.warn('DB-INIT: Connection to mongo: ok\n')
        resolve()
      }
    })
  })
}