const _ = require('lodash');

const remind = (message, args) => {
    time = args[0]
    var reminder = ""
    if (args.length > 1) {
        reminder = _.join(args.splice(1), " ");
    }

    var period = time[time.length-1]
    var timePeriod = parseInt(time.slice(0, time.length -1))

    var ms = 0
    if (period === "m") {
        ms = timePeriod * 1000 * 60
    } else if (period === "h") {
        ms = timePeriod * 1000 * 60 * 60
    } else if (period === "d") {
        ms = timePeriod * 1000 * 60 * 60 * 24
    }
    message.reply("\n" + "Reminder set for " + time + " - " + reminder)
    setTimeout(() => {
        message.reply("\n" + "REMINDER - " + reminder);
    }, ms)
}

module.exports = {
    remind
}