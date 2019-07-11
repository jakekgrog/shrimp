const Discord = require('discord.js');
const {DISCORD_CLIENT_ID} = require('./keys.json');
const {
    handleMessage,
    isCommand
} = require('./messageHandlers')
const {channelId} = require('./global_vars.json')
const {getLatestRelease, isNewRelease} = require('./utils');
const client = new Discord.Client();

client.once('ready', () => {
    const channels = client.channels
    const mainChannel = channels.get(channelId)
    sendRelease(mainChannel)
    //mainChannel.send("Back online!").then(message => console.log(message))
})

const sendRelease = async (channel) => {
    const latestRelease = await getLatestRelease()
    const isNew = await isNewRelease(latestRelease.version)
    console.log(isNew)
    if (isNew){
        console.log("\n" +
                         "I've been updated!" + "\n" +
                         "Now on version " + latestRelease.version + " - " + latestRelease.name + "\n" + "\n" +
                         "--- Changelog: ---" + "\n" + "\n" + 
                         latestRelease.changeLog + "\n" + latestRelease.url)

    }
}

client.on('message', message => {
    if (isCommand(message)) {
        handleMessage(message, client)
    }
})

client.login(DISCORD_CLIENT_ID);
