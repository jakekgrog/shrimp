const axios = require('axios');
const {owApiPath} = require('../global_vars.json');
const ow = (message,battletag) => {
    const options = {
        uri: owApiPath + battletag + "/complete/"
    }

    axios.get(options.uri)
    .then(data => {
        message.reply("Their rating is: " + data.data.rating)
        //console.log(data.data.competitiveStats)
    })
    .catch(err=> console.log(err))
    
}

module.exports = {
    ow
}