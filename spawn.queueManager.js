const rmLvlConfig = require('config.roomLevel');

//includes all the logic of when to queue a creep role for spawn
//this includes checking qty configured in room level config, and if the room has enough energy to spawn it


module.exports = {
    manageQueue: function(){
        for (let spawnName in Game.spawns){
            let spawn = Game.spawns[spawnName];
            var queue = spawn.memory.queue;
            var rcl = spawn.room.controller.level;
            var energyAvail = spawn.room.energyAvailable;

            let creepsInRoom = spawn.room.find(FIND_MY_CREEPS);

            //*CALL CONFIGS FROM rmLvlConfig like this***
            //console.log(rmLvlConfig[rcl].harvesters.bodyCost);

            let numHarvesters = _.sum(creepsInRoom, (c) => c.memory.role == 'harvester');
            let numUpgraders = _.sum(creepsInRoom, (c) => c.memory.role == 'upgrader');

            let firstInQueue = queue[0];

            if(firstInQueue == 'harvester' && numHarvesters >= rmLvlConfig[rcl][firstInQueue].qty){
                queue.shift();
            }
            else if(numHarvesters < rmLvlConfig[rcl].harvester.qty && queue.includes('harvester') == false){
                queue.push('harvester');
            }
            if(firstInQueue == 'upgrader' && numUpgraders >= rmLvlConfig[rcl][firstInQueue].qty){
                queue.shift();
            }
            else if(numUpgraders < rmLvlConfig[rcl].upgrader.qty && queue.includes('upgrader') == false){
                queue.push('upgrader');
            }
        }
    }
}