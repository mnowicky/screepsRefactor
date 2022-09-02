Memory.time = Game.time;
const Pathing = require('pathing');
const runCreeps = require('runCreeps');
const runCache = require('cache');
const purgeCache = require('purgeCache');
const queueCreeps = require('spawn.queueCreeps');
const runSpawnQueues = require('spawn.runQueues');

module.exports.loop = function () {
    /*if(Game.cpu.bucket == 10000){
        Game.cpu.generatePixel();
    }*/
    purgeCache.purgeAll();
    runCache.cacheAll();
    queueCreeps.spawnQueue();
    runSpawnQueues.runQueues();
    runCreeps.runCreeps();

}