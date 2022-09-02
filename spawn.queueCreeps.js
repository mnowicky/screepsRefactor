const rmLvlConfig = require('config.roomLevel');

module.exports = {
    spawnQueue: function(){
        for (let spawnName in Game.spawns){
            let spawn = Game.spawns[spawnName];
            var queue = spawn.memory.queue;
            var rcl = spawn.room.memory.rcl;
            var rcl = rcl.toString();
            //or rcl = spawn.room.controller.level;
            let creepsInRoom = spawn.room.find(FIND_MY_CREEPS);

            let numHarvesters = _.sum(creepsInRoom, (c) => c.memory.role == 'harvester');
            let numUpgraders = _.sum(creepsInRoom, (c) => c.memory.role == 'upgrader');

            if(numHarvesters < rmLvlConfig[rcl]['harvesters'] && queue.includes('harvester') == false){
                queue.push('harvester');
            }
            if(numUpgraders < rmLvlConfig[rcl]['upgraders'] && queue.includes('upgrader') == false){
                queue.push('upgrader');
            }
        }
        /*
        console.log(queue.includes('harvester'));
        console.log(rmLvlConfig.lvl1['harvesters']);
        console.log(rcl);
        */
    }
}