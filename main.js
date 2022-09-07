Memory.time = Game.time;
const Pathing = require('pathing');
const runCreeps = require('creep.engine');
const runCache = require('cache');
const purgeCache = require('purgeCache');
const runSpawnQueues = require('spawn.manager');

module.exports.loop = function () {
    /*if(Game.cpu.bucket == 10000){
        Game.cpu.generatePixel();
    }*/
    //delete Memory.rooms;
    purgeCache.purgeAll();
    runCache.cacheAll();
    runSpawnQueues.runQueues();
    runCreeps.runCreeps();

    Pathing.runMoves();

}