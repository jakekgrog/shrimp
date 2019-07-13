const stop = (message) => {
    var serverQueue = message.client.queue.get(message.guild.id)
    if (!message.member.voiceChannel) {
        message.channel.send('You have to be in a voice channel to do that')
    }
    serverQueue.connection.dispatcher.end()
    serverQueue.songs = []
}

module.exports = {
    stop
}