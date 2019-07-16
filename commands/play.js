const {Util} = require('discord.js')
const ytdl = require('ytdl-core')
const yts = require('yt-search')
const _ = require('lodash')

const play = async (message, songName) => {

    const queue = message.client.queue;
    const serverQueue = message.client.queue.get(message.guild.id);

    const voiceChannel = message.member.voiceChannel
    if (!voiceChannel) {
        message.channel.send('You need to be in a voice channel to play music!')
    }

    const videoUrl = await new Promise(function(resolve, reject) {
        yts(_.join(songName, " "), (err, res) => {
            if (err) reject(err);
            const videos = res.videos
            const firstResult = videos[0]
            const url = firstResult.url
            resolve(url)
        })
    })

    const songInfo = await ytdl.getInfo('https://www.youtube.com/'+videoUrl)
    const song = {
        title: songInfo.title,
        url: songInfo.video_url
    }

    if (!serverQueue) {
        const queueConstruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true
        }

        queue.set(message.guild.id, queueConstruct);

        queueConstruct.songs.push(song)

        try {
            var connection = await voiceChannel.join()
            queueConstruct.connection = connection;
            playSong(message, queueConstruct.songs[0])
        } catch (e) {
            console.log(e)
            queue.delete(message.guild.id)
            return message.channel.send(err);
        }

    } else {
        serverQueue.songs.push(song)
        return message.channel.send(`${song.title} has been added to the queue!`)
    }
}

const playSong = (message, song) => {
    const queue = message.client.queue;
    const guild = message.guild
    const serverQueue = queue.get(message.guild.id)

    if (!song) {
        serverQueue.voiceChannel.leave()
        queue.delete(guild.id)
        return;
    }
    if (song.url === undefined) {
        return
    }

    const upNext = serverQueue.songs[1]

    message.channel.send({embed: {
        color: 3447003,
        author: {
            name: "Shrimp Stream",
            icon_url: message.client.user.avatarURL
        },
        fields: [
            {
                name: "Now Playing",
                value: `Currently playing ${song.title}`
            },
            {
                name: "Up next",
                value: `Next in the queue is ${upNext !== undefined ? upNext.title : "nothing"}`
            }
        ],
        timestamp: new Date(),
        footer: {
            icon_url: message.client.user.avatarURL,
            text: " Shrimp Bot"
        }
    }})

    const dispatcher = serverQueue.connection.playStream(ytdl(song.url, {filter: 'audioonly'}))
            .on('end', () => {
                console.log('Music ended')
                serverQueue.songs.shift();
                playSong(message, serverQueue.songs[0])
            })
            .on('error', error => {
                console.log(error)
            })
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5)
}

module.exports = {
    play
}