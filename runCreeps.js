const roleHarvester = require('role.harvester');

module.exports = {
    runCreeps: function(){
        console.log('running creeps...');
        for (let name in Game.creeps){
            let creep = Game.creeps[name];
            let spawn = creep.memory.spawn;

            if(!creep.spawning){
                if(creep.memory.role == 'harvester') {
                    roleHarvester.run(creep);
                }
            }
        }
    }
}