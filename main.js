Memory.time = Game.time;
require('globals');
const Pathing = require('pathing');
const runCreeps = require('creep.engine');
const runCache = require('cache');
const purgeCache = require('purgeCache');
const runSpawnQueues = require('spawn.manager');
const utils = require('utils');

module.exports.loop = function () {
    /*if(Game.cpu.bucket == 10000){
        Game.cpu.generatePixel();
    }*/
    //printResourceUsage();
    utils.initRoom();
    delete Memory.rooms;
    //delete Memory.spawns;
    purgeCache.cleanMemory();
    runCache.cacheAll();
    runSpawnQueues.runQueues();
    runCreeps.runCreeps();

    Pathing.runMoves();

}