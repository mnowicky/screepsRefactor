module.exports = {
    runCreeps: function(){
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