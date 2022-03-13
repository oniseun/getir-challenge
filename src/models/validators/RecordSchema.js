const Joi = require('joi').defaults((schema) => schema.options({
    allowUnknown: false
  })).extend(require('@joi/date'));


module.exports = {
   
        body : Joi.object({
            startDate: Joi.date().format('YYYY-MM-DD').utc(),
            endDate: Joi.date().format('YYYY-MM-DD').utc(),
            minCount:Joi.number(),
            maxCount: Joi.number(),
        })
    
}

