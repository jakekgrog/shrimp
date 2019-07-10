const getRandInt = async (max) => {
    return Math.floor(Math.random() * Math.floor(max))
}

module.exports = {
    getRandInt
}