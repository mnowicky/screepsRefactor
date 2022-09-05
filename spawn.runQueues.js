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
            var energyCapacity = spawn.room.energyCapacityAvailable;
            var name = undefined;
            var rm = Game.rooms[rmName];
            var energyAvail = rm.energyAvailable;
            var rcl = spawn.room.controller.level;
            console.log('rm:'+rm);
            console.log('energy:' + energyAvail);
            console.log('queue length:' +queue.length);
            if(queue.length>0){
                let firstQueued = queue[0];
                let spawnCost = rmLvlConfig[rcl][firstQueued].bodyCost;
                //console.log(rmLvlConfig[rcl][firstQueued].bodyCost);
                if(energyAvailable >= spawnCost){
                    name = buildCreep.genBalancedCreep(spawnCost, firstQueued, sName, spawn);
                }
                
                if(spawn.spawning == true){
                    queue.shift();
                }
            }



            //console.log('hi');
            //console.log(firstPos);
            //console.log(spawn);
        }
    }
}