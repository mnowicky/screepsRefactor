var buildCreep = require('spawn.buildCreeps');
const rmLvlConfig = require('config.roomLevel');

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

            //queue necessary creeps
            let numHarvesters = _.sum(creepsInRoom, (c) => c.memory.role == 'harvester');
            let numUpgraders = _.sum(creepsInRoom, (c) => c.memory.role == 'upgrader');
            let numBuilders = _.sum(creepsInRoom, (c) => c.memory.role == 'builder');

            if(numHarvesters < rmLvlConfig[rcl].harvester.qty && queue.includes('harvester') == false){
                queue.push('harvester');
            }
            if(numBuilders < rmLvlConfig[rcl].builder.qty && queue.includes('builder') == false){
                queue.push('builder');
            }
            if(numUpgraders < rmLvlConfig[rcl].qty && queue.includes('upgrader') == false){
                queue.push('upgrader');
            }

            //run spawn queue
            //if there are creeps in the spawn queue... identify role and body cost.
            if(queue && queue.length>0){
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