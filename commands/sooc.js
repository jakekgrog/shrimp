const _ = require('lodash');

const {put} = require('../storageEngine.js');
const {channelId} = require('../global_vars.json')

const sooc = async (msg, args, client) => {
    const user = args[0];
    const channels = client.channels
    const mainChannel = channels.get(channelId);
    const messages = await mainChannel.fetchMessages({limit: 10});
    
    let lastMessageByUser = null
    try {
        messages.forEach(message => {
            if (!_.isNil(message.member.nickname)) {
                if (message.member.nickname === user) {
                    lastMessageByUser = message.content;
                    throw BreakException;
                }
            } else {
                if (message.author.username === user) {
                    lastMessageByUser = message.content
                    throw BreakException;
                }
            }
        })
    } catch (e) {
        console.log(e);
    }
    
    var res = ""
    if (!_.isNil(lastMessageByUser)) {
        var res = await put({ user: user, message: lastMessageByUser })
        msg.reply(res);
    } else {
        msg.reply("Couldn't find " + user + "'s latest message");
    }
}

module.exports = {
    sooc
}