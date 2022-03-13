
const RecordHelper = require('../helpers/RecordHelper')
const AppResponse = require('../models/response/AppResponse')
const enums = require('../config/enums')

class RecordController {
  
  static findRecord(req, res) {
  
    const { body } = req
  
    return RecordHelper.findRecord({ ...body })
      .then((items) => {
        if (items.length === 0) {
          return res.status(404).json(new AppResponse( enums.RESPONSE_CODE.NOT_FOUND, enums.RESPONSE_MSG.NOT_FOUND, [] ))
        }
        return res.status(200).json(new AppResponse(enums.RESPONSE_CODE.SUCCESS, enums.RESPONSE_MSG.SUCCESS, items))
      })
      .catch((err) => {
        console.log(err)
        return res.status(503).json(new AppResponse( enums.RESPONSE_CODE.FAILED, enums.RESPONSE_MSG.FAILED, [err] ))
      });
  }
  
  
}

module.exports = RecordController