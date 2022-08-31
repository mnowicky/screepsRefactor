Memory.time = Game.time;
const Pathing = require('pathing');
const runCreeps = require('runCreeps');
const runCache = require('cache');

module.exports.loop = function () {
    if(Game.cpu.bucket == 10000){
        Game.cpu.generatePixel();
    }
    runCache.cacheRoom();
    runCreeps.runCreeps();

}