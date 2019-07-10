const _ = require('lodash')

var isVoteInProgress = false;
var voteOptions = {}

const vote = (message, args) => {
    if (!isVoteInProgress) {

        isVoteInProgress = true;
        args.forEach(element => {
            voteOptions[element] = [element, 0]
        });
        
        returnMessage = "\n" + "VOTE STARTING - 30 Seconds to vote!" + "\n" + "OPTIONS: " + "\n"
        args.forEach(element => {
            returnMessage = returnMessage + " - " + element + "\n"
        })
        returnMessage = returnMessage + "Vote using !vote [OPTION]"
        message.reply(returnMessage)

        setTimeout(() => {
            isVoteInProgress = false
            max = ["", 0]
            for (var key in voteOptions) {
                if (voteOptions[key][1] > max[1]) {
                    max = voteOptions[key]
                }
            }
            message.reply("Winner is: " + max[0] + " with " + max[1] + " votes!")
            voteOptions = {}
            
        }, 30000)
        
    } else {
        option = args[0]
        if (!_.isNil(voteOptions[option])) {
            voteOptions[option][1]++;
        }
    }
}

module.exports = {
    vote
}