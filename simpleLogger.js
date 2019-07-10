const fs = require('fs');

const logMsg = async (logLevel, message) => {
    fs.writeFile('shrimp.log', "["+logLevel+"]" + " " + message, (err) => {
        if (err) throw err;
    })
    return
}

module.exports = {
    logMsg
}