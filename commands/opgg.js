const request = require('request');
const {opggSummonerPath} = require('../global_vars.json');

const opgg = (message, summoner) => {
    const options = {
        uri: opggSummonerPath + summoner
    }

    request(options, (err, res, body) => {

        let rank, wins, loses, lp, winRatio

        var html = body.replace(/\s/g,'');
        var matchRank = html.match(regexr.rank);
        var matchWins = html.match(regexr.wins);
        var matchLoses = html.match(regexr.loses);
        var matchWinRatio = html.match(regexr.winRatio);
        var matchLp = html.match(regexr.lp);
        if (matchRank) {
            rank = matchRank[1]
        }
        if (matchWins) {
            wins = matchWins[1]
        }
        if (matchLoses) {
            loses = matchLoses[1]
        }
        if (matchLp) {
            lp = matchLp[1]
        }
        if (matchWinRatio) {
            winRatio = matchWinRatio[1]
        }

        message.reply("Rank: " + rank + 
                    "\n" + "Wins: " + wins + 
                    "\n" + "Losses: " + loses + 
                    "\n" + "LP: " + lp + 
                    "\n" + "Win Ratio: " + winRatio )
    })
}

const regexr = {
    rank: /<divclass="TierRank">([^<]*)<\/div>/,
    winRatio: /<spanclass="winratio">([^<]*)<\/span>/,
    wins: /<spanclass="wins">([^<]*)<\/span>/,
    loses: /<spanclass="losses">([^<]*)<\/span>/,
    lp: /<spanclass="LeaguePoints">([^<]*)<\/span>/
}

module.exports = {
    opgg
}