const request = require('request-promise')
const { json } = require('micro')
const parseQuery = require('micro-query')
const querystring = require('querystring')
require('dotenv').config()

const TAGS = 'id,name,duration,previews,url,tags'
const PAGE_SIZE = 50


module.exports = async (req, res, end) => {
  try {
    const { query, maxDuration, sort } = await parseQuery(req)

    const qs = {
      query,
      page_size: PAGE_SIZE,
      token: process.env.API_KEY,
      fields: TAGS
    }

    if (maxDuration) {
      qs.filter = `duration:[* TO ${maxDuration}]`
    }
    if (sort) {
      qs.sort = sort
    }
    const url = `https://freesound.org/apiv2/search/text/?${ querystring.stringify(qs)}`

    const response = await request({
      method: 'GET',
      url,
      json: true
    })

    return response

  } catch(err) {
    return err
  }
}
