


module.exports.findRecord =  async (Model, fields, clientId, query) => {
  const data =  { clientId, isDeleted: false }

  for (let field of fields) {
    if (query[field] !== undefined) {
      data[field] = query[field]
    }
  }

  if (query.search !== undefined) {
    const search = new RegExp(`.*${query.search}.*`)

    const criteria = fields.reduce((conditions, field ) => {
      conditions.push({ [field] : {'$regex': search, '$options': 'i'}})
      return conditions
    }, [])

    data["$or"] = criteria
  }

  
  const total = await Model.countDocuments(data)
  const page = parseInt(query.page) || 1;
  const perPage =  parseInt(query.perPage) || 15
  const pageCount = Math.ceil(total / perPage)
  const previousPage = (page > 1) ? page - 1 : false
  const nextPage = (pageCount >=  page + 1) ? page + 1 : false

  const skip = (page - 1) * perPage
  const items = await Model.find(data).skip(skip).limit(perPage).sort("-createdAt").lean()

  if (!items || items.length === 0) {
    console.error(`BENEFICIARIES_NOT_FOUND: clientId:${clientId} No Beneficiaries found `);
    throw new Error('BENEFICIARIES_NOT_FOUND')
  }
  
  const meta  = { page, perPage, previousPage, nextPage, pageCount, total }
  return { items , meta }

}
