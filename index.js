const Discord = require('discord.js');
const {DISCORD_CLIENT_ID} = require('./keys.json');
const {
    handleMessage,
    isCommand
} = require('./messageHandlers')
const {channelId} = require('./global_vars.json')

const client = new Discord.Client();

client.once('ready', () => {
    const channels = client.channels
    const mainChannel = channels.get(channelId)
    mainChannel.send("Back online!").then(message => console.log(message))
})

client.on('message', message => {
    if (isCommand(message)) {
        handleMessage(message, client)
    }
})

client.login(DISCORD_CLIENT_ID);
