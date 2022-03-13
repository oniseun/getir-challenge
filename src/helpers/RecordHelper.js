
const Record = require('../models/Record')

module.exports.findRecord = async ({ startDate, endDate, minCount, maxCount }) => {

  const items = await Record.Model.aggregate([
    {
      $match: {
        createdAt: { $gte: new Date(startDate), $lt: new Date(endDate) }
      }
    },
    {
      $project: {
        _id: false,
        key: true,
        createdAt: true,
        totalCount: {
          $reduce: {
            input: '$counts',
            initialValue: 0,
            in: {
              $sum: ['$$value', '$$this']
            }
          }
        }
      }
    },
    {
      $match: {
        totalCount: { $gte: minCount, $lt: maxCount }
      }
    }
  ])

  return items

}
