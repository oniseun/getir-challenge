const AppResponse = require('../models/response/AppResponse')
const enums = require('../config/enums')

module.exports = function expressValidator(err, req, res, next) {  

    if (err && err.error && err.error.isJoi) {

        console.error('validation error::', JSON.stringify(err.error))

        return res.status(400).json( new AppResponse(enums.RESPONSE_CODE.INVALID_INPUT, enums.RESPONSE_MSG.INVALID_INPUT, [err.error.message, err.error]));

      } else {
        return next(err);
      }
    
}
