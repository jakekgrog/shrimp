const _ = require('lodash');

const help = (message, args) => {

    if (args && args.length > 0) {
        command = args[0]
        try {
            helper = mapCommandToDescription[command]

            message.channel.send({embed: {
                color: 3447003,
                author: {
                    name: "Shrimp Helper",
                    icon_url: message.client.user.avatarURL
                },
                fields: [
                    {
                        name: "Command",
                        value: command
                    },
                    {
                        name: "Description",
                        value: helper.desc
                    },
                    {
                        name: "Usage",
                        value: helper.usage
                    }
                ],
                timestamp: new Date(),
                footer: {
                    icon_url: message.client.user.avatarURL,
                    text: " Shrimp Bot"
                }
            }})
        } catch (e) {
            message.channel.send("That is not a command! Use !help with no arguments to get all commands")
        }
    } else {
        helpString = ""
        _.forEach(mapCommandToDescription, function(value, key) {
            helpString = helpString + "\n" + key + ","
        })


        message.channel.send({embed: {
            color: 3447003,
            author: {
                name: "Shrimp Helper",
                icon_url: message.client.user.avatarURL
            },
            fields: [
                {
                    name: "Commands",
                    value: "For more info on a specific command, use: !help [COMMAND] (exclude '!' in the command)"
                },
                {
                    name: "Commands",
                    value: helpString
                },
            ],
            timestamp: new Date(),
            footer: {
                icon_url: message.client.user.avatarURL,
                text: " Shrimp Bot"
            }
        }})
    }
}

const buildHelpFields = () => {

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
    },
    "play": {
        desc: "Stream a song to a voice channel. If there is music playing then the song will be queued",
        usage: "!play [Song Name]"
    },
    "skip": {
        desc: "Skip the current song and move to the next song in the queue",
        usage: "!skip"
    },
    "stop": {
        desc: "Stop playing music altogether",
        usage: "!stop"
    },
    "about": {
        desc: "Get statistical information about Shrimp Bot",
        usage: "!about"
    }
}

module.exports = {
    help,
    mapCommandToDescription
}