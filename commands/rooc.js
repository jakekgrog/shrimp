const {get} = require('../storageEngine.js');
const {getRandInt} = require('../utils.js')

const rooc = async (msg, args) => {
    const user = args[0]
    
    var quotes = await get(user);
    var messages = [];
    for (var i = 0; i < quotes.length; i++) {
        messages.push(quotes[i].message);
    }
    
    var mess = messages[await getRandInt(messages.length)]    
    msg.reply(mess)
}

module.exports = {
    rooc
}