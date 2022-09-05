Memory.time = Game.time;
const Pathing = require('pathing');
const runCreeps = require('runCreeps');
const runCache = require('cache');
const purgeCache = require('purgeCache');
const queueCreeps = require('spawn.queueManager');
const runSpawnQueues = require('spawn.runQueues');

module.exports.loop = function () {
    /*if(Game.cpu.bucket == 10000){
        Game.cpu.generatePixel();
    }*/
    delete Memory.spawns;
    purgeCache.purgeAll();
    runCache.cacheAll();
    queueCreeps.manageQueue();
    runSpawnQueues.runQueues();
    runCreeps.runCreeps();

    Pathing.runMoves();

}