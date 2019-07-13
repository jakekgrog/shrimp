const skip = (message) => {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!message.member.voiceChannel) {
        message.channel.send('You have to be in a voice channel to stop music!')
    }

    if (!serverQueue) {
        message.channel.send('There aren\'t any songs in the queue!')
    }

    serverQueue.connection.dispatcher.end();
}

module.exports = {
    skip
}