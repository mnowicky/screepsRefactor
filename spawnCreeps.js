modeule.exports = {
    spawnCreeps: function(){
        for (let spawnName in Game.spawns){
            let spawn = Game.spawns[spawnName];
            let creepsInRoom = spawn.room.find(FIND_MY_CREEPS);

            let numHarvesters = _.sum(creepsInRoom, (c) => c.memory.role == 'harvester');
            let numUpgraders = _.sum(creepsInRoom, (c) => c.memory.role == 'upgrader');
        }
    }
}