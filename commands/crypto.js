const {cryptoEndpoint} = require('../global_vars.json');
const request = require('request');

const crypto = (message) => {
    const options = {
        uri: cryptoEndpoint
    }

    request(options, (err, res, body) => {
        body = JSON.parse(body);

        const xrp = body.XRP.EUR;
        const eth = body.ETH.EUR;
        const link = body.LINK.EUR;

        message.reply("\n" + "ChainLink Price: €" + link + 
                    "\n" + "Ethereum Price: €" + eth + 
                    "\n" + "Ripple XRP Price: €" + xrp)
    })
}

module.exports = {
    crypto
}