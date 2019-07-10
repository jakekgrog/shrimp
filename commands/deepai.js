const request = require('request')
const _ = require('lodash')
const deepai = require('deepai')
const keys = require('../keys.json')
const axios = require('axios')

deepai.setApiKey(keys.DEEP_DREAM_API_KEY)

const deepDream = async (url, message) => {

    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const regex = new RegExp(expression)
    if (url.match(regex)){
        message.reply("\n" + "Hang on, I'll get back shortly!")
        const res = await deepai.callStandardApi('deepdream', {
            image: url
        })
        console.log(res.output_url)
        message.reply("", {embed: {image: {url: res.output_url}}})
    } else {
        message.reply("\n" + "That's not an image!")
    }
}

const colorize = async (url, message) => {
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const regex = new RegExp(expression)
    if (url.match(regex)){
        message.reply("\n" + "Hang on, I'll get back shortly!")
        const res = await deepai.callStandardApi('colorizer', {
            image: url
        })
        console.log(res.output_url)
        message.reply("", {embed: {image: {url: res.output_url}}})
    } else {
        message.reply("\n" + "That's not an image!")
    }
}

module.exports = {
    deepDream,
    colorize
}