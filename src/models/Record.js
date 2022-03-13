

/**
 * Record.js
 *
 * @description :: Model for record 
 */
 'use strict'
 const mongoose = require('mongoose')
 require('mongoose-long')(mongoose)

const schema = mongoose.Schema({
    key: { type: String, required: true},
    createdAt: { type: Date, required: true},
    counts: { type: [Number] }
});

schema.set('toJSON', {
transform: function(doc, ret,) {
 ret.id = ret._id;
 return ret
}
});


module.exports.Model = mongoose.model('Record', schema );