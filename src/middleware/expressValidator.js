const ErrorResponse = require('../models/response/ErrorResponse')
const enums = require('../config/enums')
const { StatusCodes } =  require('http-status-codes')

module.exports = function expressValidator(err, req, res, next) {  

    if (err && err.error && err.error.isJoi) {

        console.error('validation error::', JSON.stringify(err.error))

        return res.status(StatusCodes.BAD_REQUEST).json( new ErrorResponse(enums.RESPONSE_CODE.INVALID_INPUT, enums.RESPONSE_MSG.INVALID_INPUT, [err.error.message, err.error]));

      } else {
        return next(err);
      }
    
}
