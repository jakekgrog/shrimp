const axios = require('axios')
const {getRelease, putRelease} = require('./storageEngine')

const getRandInt = async (max) => {
    return Math.floor(Math.random() * Math.floor(max))
}

const getLatestRelease = async () => {
    const res = await axios.get('https://api.github.com/repos/r-dog/shrimp/releases/latest')
    return {
        version: res.data.tag_name,
        url: res.data.url,
        name: res.data.name,
        changeLog: res.data.body
    }
}

const isNewRelease = async (release) => {
    const rel = await getRelease()
    console.log(rel[0].name, release, rel[0].name === release)
    if (rel && rel.length > 0) {
        if (rel[0].name === release) {
             console.log("IM HERE")
             return false
        }
        putRelease(release)
        return true
    } else {
        await putRelease(release);
        return true
    }
}

module.exports = {
    getRandInt,
    getLatestRelease,
    isNewRelease
}
