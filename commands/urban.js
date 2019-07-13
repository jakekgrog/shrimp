const _ = require('lodash')
const axios = require('axios')

const urban = async (message, args) => {

    var res = await axios.get('http://api.urbandictionary.com/v0/define?term=' + _.join(args, " "))
    const list = res.data.list
    
    var index = 0
    var current = 0

    for (var i = 0; i < list.length; i++) {
        if (list[i].thumbs_up > current) {
            index = i
            current = list[i].thumbs_up
        }
    }

    message.reply("\n" + list[index].definition +  "\n" + list[index].example)
}

module.exports = {
    urban
}