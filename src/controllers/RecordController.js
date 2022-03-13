
const RecordHelper = require('../helpers/RecordHelper')
const SuccessResponse = require('../models/response/SuccessResponse')
const ErrorResponse = require('../models/response/ErrorResponse')
const enums = require('../config/enums')
const { StatusCodes } =  require('http-status-codes')

class RecordController {
  
  static findRecord(req, res) {
  
    const { body } = req
  
    return RecordHelper.findRecord({ ...body })
      .then((items) => {
        if (items.length === 0) {
          return res.status(StatusCodes.NOT_FOUND).json(new ErrorResponse( enums.RESPONSE_CODE.NOT_FOUND, enums.RESPONSE_MSG.NOT_FOUND, [] ))
        }
        return res.status(StatusCodes.OK).json(new SuccessResponse(enums.RESPONSE_CODE.SUCCESS, enums.RESPONSE_MSG.SUCCESS, items))
      })
      .catch((err) => {
        console.error(err)
        return res.status(StatusCodes.SERVICE_UNAVAILABLE).json(new ErrorResponse( enums.RESPONSE_CODE.FAILED, enums.RESPONSE_MSG.FAILED, [err] ))
      });
  }
  
  
}

module.exports = RecordController