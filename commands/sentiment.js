const request = require('request')
const _ = require('lodash')

const sentiment = async (text) => {
    const req = {
        url: "http://text-processing.com/api/sentiment/",
        body: "text="+encodeURI(text)

    }
    console.log(text)
    const response = await new Promise(function(resolve, reject) {
        request.post(req, (err, res, body) => {
            if (err) reject(err);
            resolve(body)
        })
    })

    var result = JSON.parse(response)
    const obj = result.probability
    
    max = ["", 0]
    index = 0
    arr = []
    Object.keys(obj).forEach(function(key) {
        if (obj[key] > max[1]) {
            arr.push([key, obj[key]])
	}
    })
    for (var i = 0; i<arr.length; i++) {
        if (arr[i][1] > max[1]) {
            max[0] = arr[i][0]
            max[1] = arr[i][1]
        }
    }
    return {
        senti: mapSentiResponseToWord[max[0]],
        perc: max[1] * 100
    }
}

const mapSentiResponseToWord = {
    "neg": "negative",
    "pos": "positive",
    "neutral": "neutral"
}

module.exports = {
    sentiment
}
