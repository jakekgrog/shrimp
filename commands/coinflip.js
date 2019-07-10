
const {getRandInt} = require('../utils.js')


const images = ['https://www.random.org/coins/faces/60-eur/ireland-1euro/reverse.jpg',
                'https://www.random.org/coins/faces/60-eur/ireland-1euro/obverse.jpg']

const coinflip = async (message) => {
    const index = await getRandInt(2)
    message.reply("", {embed: {image: {url: images[index]}}})
}

module.exports = {
    coinflip
}