const request = require('request')
const _ = require('lodash')

const updown = async (endpoint) => {
    const req = {
        uri: "https://isitdown.site/api/v3/"+endpoint,
    }

    const response = await new Promise(function(resolve, reject) {
        request(req, (err, res, body) => {
            if (err) reject(err);
            resolve(body)
        })
    })

    var result = JSON.parse(response)
    
    var respCode = result.response_code
    const host = result.host
    var isitdown = result.isitdown

    if (host === undefined) {
        isitdown = true
        respCode = '-1 :('
    }

    return {
        responseCode: respCode,
        host: endpoint,
        isitdown: isitdown ? 'down' : 'not down',
    }
}

module.exports = {
    updown
}