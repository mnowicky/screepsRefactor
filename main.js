Memory.time = Game.time;
const Pathing = require('pathing');
const runCreeps = require('runCreeps');
const runCache = require('cache');
const purgeCache = require('purgeCache');
const runSpawnQueues = require('spawn.manager');

module.exports.loop = function () {
    /*if(Game.cpu.bucket == 10000){
        Game.cpu.generatePixel();
    }*/

    purgeCache.purgeAll();
    runCache.cacheAll();
    runSpawnQueues.runQueues();
    runCreeps.runCreeps();

    Pathing.runMoves();

}