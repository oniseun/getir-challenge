
const RecordHelper = require('../helpers/RecordHelper')
const AppResponse = require('../models/response/AppResponse')
const enums = require('../config/enums')

class RecordController {


  constructor(model, schema) {
    this.model = model;

  }
  
  findRecord(req, res) {
  
    const { params: { clientId }, query } = req
  
    return RecordHelper.findRecord(this.model, this.schema.find.searchFields, clientId, query )
      .then((result) => {
        const { items, meta } = result 
        return res.status(200).json(new AppResponse(0, enums.RESPONSE_MSG.SUCCESS, items, [], meta ))
      })
      .catch((err) => {
        return res.status(404).json(new AppResponse( -1, enums.RESPONSE_MSG.FAILED, [err] ))
      });
  }
  
  
}

module.exports = RecordController