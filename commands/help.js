const _ = require('lodash');

const help = (message) => {
    
    helpString = ""
    _.forEach(mapCommandToDescription, function(value, key) {
        console.log(value)
        helpString = helpString + "\n" + "!" + key + 
                                "\n" + "[Desc]: " + value.desc + 
                                "\n" + "[Usage]: " +  value.usage + "\n"
    })
    message.reply(helpString)
}

const mapCommandToDescription = {
    "ping":  { 
        desc: "Returns Pong! if server is alive",
        usage: "!ping"
    },
    "lolstats": {
        desc: "Returns players opgg stats",
        usage: "!lolstats [username]"
    },
    "crypto": {
        desc: "Returns crypto currency information",
        usage: "!crypto"
    },
    "vote": {
        desc: "Allows user to start a vote OR vote on an option",
        usage: "!vote [,options] OR !vote [option]"
    },
    "remind": {
        desc: "Allows user to set a reminder",
        usage: "!remind [period][(d)ays, (h)ours, (m)inutes] [reminder message] (e.g 20m)"
    },
    "sooc": {
        desc: "Save Out Of Context - Saves the last message from the specified user",
        usage: "!sooc [user]"
    },
    "rooc": {
        desc: "Selects a random quote for a user that was saved with !sooc",
        usage: "!rooc [user]"
    },
    "sentiment": {
        desc: "Returns whether a piece of text has a positive, neutral or negative sentiment and the percentage",
        usage: "!sentiment [text]"
    },
    "updown": {
        desc: "Returns whether a given host (website) is up or down",
        usage: "!updown [url]"
    },
    "coinflip": {
        desc: "Returns an image of the head or tail of a coin",
        usage: "!coinflip"
    },
    "deepdream": {
        desc: "Takes an image attachment, runs it through Deep Dream network and returns the output image",
        usage: "!deepdream [Attachment Image]"
    },
    "colorize": {
        desc: "Takes a black and white photo attachment, runs it through a DeepAI network and returns a colorized version",
        usage: "!colorize [Attachment Image]"
    }
}

module.exports = {
    help,
    mapCommandToDescription
}