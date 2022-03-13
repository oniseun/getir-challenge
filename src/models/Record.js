

/**
 * Record.js
 *
 * @description :: Model for record 
 */
 'use strict'
 const mongoose = require('mongoose')
 require('mongoose-long')(mongoose)

const schema = mongoose.Schema({
    clientId: { type: Number, required: true},
    name: { type: String,  required: true },
    networkProvider: {type: String, required: true},
    phoneNumber: { type: String },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

schema.set('toJSON', {
transform: function(doc, ret,) {
 ret.id = ret._id;
 return ret
}
});


module.exports.Model = mongoose.model('Record', schema );