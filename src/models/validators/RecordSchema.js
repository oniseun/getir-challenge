const Joi = require('joi').defaults((schema) => schema.options({
    allowUnknown: false
  }));

module.exports = {
   
        params : Joi.object({
            startDate: Joi.date().format('YYYY-MM-DD').utc(),
            endDate: Joi.date().format('YYYY-MM-DD').utc(),
            minCount:Joi.number(),
            maxCount: Joi.number(),
        })
    
}

