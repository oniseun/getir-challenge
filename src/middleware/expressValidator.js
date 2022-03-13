const AppResponse = require('../models/response/AppResponse')

module.exports = function expressValidator(err, req, res, next) {  

    if (err && err.error && err.error.isJoi) {

        console.error('validation error::', JSON.stringify(err.error))

        return res.status(400).json( new AppResponse(1, err.error.message, [err.error]));

      } else {
        return next(err);
      }
    
}
