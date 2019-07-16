const {getLatestRelease} = require('../utils.js')

const about = async (message) => {

    const releaseInfo = await getLatestRelease()
    console.log(message.client.users)

    message.channel.send({embed: {
        color: 3447003,
        author: {
            name: "Shrimp Info",
            icon_url: message.client.user.avatarURL
        },
        fields: [
            {
                name: "Version",
                value: `I am on version ${releaseInfo.version} - ${releaseInfo.name}`
            },
            {
                name: "NodeJS Version",
                value: `I am running on ${process.version}`
            },
            {
                name: "Statistics",
                value: `Servers: ${message.client.guilds.size}` + "\n" + 
                        `Clusters: ${message.client.guilds.size}` + "\n" +
                        `Users: ${message.client.users.size - 2}` + "\n" +
                        `Next Cluster: When I'm added to ${2500 - message.client.guilds.size} more servers I will create a new cluster`
            }
        ],

        timestamp: new Date(),
        footer: {
            icon_url: message.client.user.avatarURL,
            text: " Shrimp Bot"
        }
    }})
}

module.exports = {
    about
}