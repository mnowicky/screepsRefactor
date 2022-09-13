var buildCreep = require('spawn.buildCreeps');
const rmLvlConfig = require('config.roomLevel');
const creepMinimums = require('spawn.creepMinimums');

module.exports = {
    runQueues: function(){
        for(let spawnName in Game.spawns){
            let spawn = Game.spawns[spawnName];
            let sName = spawn.name;
            let queue = spawn.memory.queue;
            let rmName = spawn.room.name;
            var energyAvailable = spawn.room.energyAvailable;
            var name = undefined;
            var rm = Game.rooms[rmName];
            var energyAvail = rm.energyAvailable;
            var rcl = spawn.room.controller.level;
            var creepsInRoom = spawn.room.find(FIND_MY_CREEPS);
            
            //decide creep minimums
            creepMinimums.run(spawn);

            //number of each role currently in queue...
            var queuedHarvesters = creepMinimums.returnNumberOfQueuedType(spawn, 'harvester');
            var queuedBuilders = creepMinimums.returnNumberOfQueuedType(spawn, 'builder');
            var queuedUpgraders = creepMinimums.returnNumberOfQueuedType(spawn, 'upgrader');

            //number of each role in the home room...
            let numHarvesters = _.sum(creepsInRoom, (c) => c.memory.role == 'harvester');
            let numUpgraders = _.sum(creepsInRoom, (c) => c.memory.role == 'upgrader');
            let numBuilders = _.sum(creepsInRoom, (c) => c.memory.role == 'builder');

            console.log(Number(numHarvesters) + Number(queuedHarvesters));
            console.log(Memory.rooms[rmName].creepMinimums.minHarvesters + 6);

            //modify the + number to dictate how many extra external room harvesters you have
            if((numHarvesters + queuedHarvesters) < Memory.rooms[rmName].creepMinimums.minHarvesters + 6){
                queue.push('harvester');
            }
            if((numBuilders + queuedBuilders) < Memory.rooms[rmName].creepMinimums.minBuilders){
                queue.push('builder');
            }
            if((numUpgraders + queuedUpgraders) < Memory.rooms[rmName].creepMinimums.minUpgraders){
                queue.push('upgrader');
            }

            //run spawn queue
            //if there are creeps in the spawn queue... identify role and body cost.
            if(queue && queue.length>0 && Memory.utils.initMemWipe == true){
                let firstQueued = queue[0];
                let spawnCost = rmLvlConfig[rcl][firstQueued].bodyCost;
                
                //if energy in room is at least the cost of the queued creep, spawn the creep.
                if(energyAvailable >= spawnCost){
                    name = buildCreep.genBalancedCreep(spawnCost, firstQueued, sName, spawn);
                    if(name == '0'){
                        queue.shift();
                    }
                }
                //else, if room is dying (<3 creeps), spawn a harvester with whatever energy available (at least 200)
                else{
                    if(creepsInRoom.length < 3 && energyAvail >= 200){
                        name = buildCreep.genBalancedCreep(energyAvail, 'harvester', sName, spawn);
                    }
                }
            }
        }
    }
}