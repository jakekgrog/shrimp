const _ = require('lodash')

const {prefix} = require('./global_vars.json')
const {put, get} = require('./storageEngine');
const {sentiment} = require('./commands/sentiment.js')
const {updown} = require('./commands/updown.js')
const {ping} = require('./commands/ping.js')
const {opgg} = require('./commands/opgg.js')
const {help} = require('./commands/help.js')
const {crypto} = require('./commands/crypto.js')
const {vote} = require('./commands/vote.js')
const {remind} = require('./commands/remind.js')
const {sooc} = require('./commands/sooc.js')
const {rooc} = require('./commands/rooc.js')
const {coinflip} = require('./commands/coinflip.js')
const {deepDream, colorize} = require('./commands/deepai.js')

const tokenizer = (message) => {
    const tokens = _.split(message.content, ' ')

    var command = tokens[0]
    var args = []

    if (tokens.length > 1) {
        args = tokens.splice(1)
    }

    return {
        command: command,
        args: args
    }
}

const handleMessage = (message, client) => {
    const tokenized = tokenizer(message);
    const command = tokenized.command
    const args = tokenized.args
    
    const handler = commands[command]
    handler(message, args, client)
}

const isCommand = (message) => {
    if (message.content[0] === prefix) {
        return true
    }
    return false
}

const pingHandler = (message, args, client) => {
    ping(message)
}

const opggHandler = (message, args, client) => {
    opgg(message, _.join(args, "+"))
}

const helpHandler = (message, args, client) => {
    help(message)
}

const cryptoHandler = (message, args, client) => {
    crypto(message)
}

const voteHandler = (message, args, client) => {
    vote(message, args)
}

const remindHandler = (message, args, client) => {
    remind(message, args)
}

const soocHandler = async (msg, args, client) => {
    sooc(msg, args, client)
}

const roocHandler = async (msg, args, client) => {
    rooc(message, args)
}

const coinHandler = async (message, args, client) => {
    coinflip(message)
}

const deepDreamHandler = async (message, args, client) => {
    const attachmentUrl = Array.from(message.attachments)[0][1].url
    deepDream(attachmentUrl, message)

}

const colorizeHandler = async (message, args, client) => {
    const attachmentUrl = Array.from(message.attachments)[0][1].url
    colorize(attachmentUrl, message)

}

const updownHandler = async (message, args, client) => {
    const endpoint = args[0]
    const response = await updown(endpoint)
    
    const host = response.host
    const isitdown = response.isitdown
    const responseCode = response.responseCode

    message.reply("\n" + 
        "The host " + host + " is " + isitdown + " and responded with " + responseCode)
}

const sentimentHandler = async (message, args, client) => {
    const text = _.join(args, " ")
    const senti = await sentiment(text);
    
    const emotion = senti.senti;
    const perc = senti.perc.toFixed(3).toString() + "%";

    message.reply("\n" + "I'm " +  perc + " sure that was " + emotion)
}

const commands = {
    "!ping": pingHandler,
    "!lolstats": opggHandler,
    "!crypto": cryptoHandler,
    "!help": helpHandler,
    "!vote": voteHandler,
    "!remind": remindHandler,
    "!sooc": soocHandler,
    "!rooc": roocHandler,
    "!sentiment": sentimentHandler,
    "!updown": updownHandler,
    "!coinflip": coinHandler,
    "!deepdream": deepDreamHandler,
    "!colorize": colorizeHandler
}

const regexr = {
    rank: /<divclass="TierRank">([^<]*)<\/div>/,
    winRatio: /<spanclass="winratio">([^<]*)<\/span>/,
    wins: /<spanclass="wins">([^<]*)<\/span>/,
    loses: /<spanclass="losses">([^<]*)<\/span>/,
    lp: /<spanclass="LeaguePoints">([^<]*)<\/span>/
}

module.exports = {
    handleMessage,
    isCommand
}
