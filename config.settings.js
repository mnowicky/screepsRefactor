const username = Object.values(Game.structures).concat(Object.values(Game.creeps), Object.values(Game.powerCreeps), Object.values(Game.constructionSites))[0].owner.username;

var config = {
    username: 'player1'
}

module.exports = config;