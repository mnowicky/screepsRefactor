module.exports = {
    rcl1: function(creep, working){
        if(working == true){
            let targets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_SPAWN 
                || s.structureType == STRUCTURE_EXTENSION
                || s.structureType == STRUCTURE_TOWER)
                && s.energy < s.energyCapacity
            });

            if(targets){
                if(creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(targets);
                    return;
                }
            }
            else{
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE){
                    creep.moveTo(creep.room.controller);
                }
            }
        }
        else{
            let src = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
            console.log(src);
            if(creep.harvest(src) != OK){
                creep.moveTo(src);
            }
        }
        
    }, 
    rcl2: function(creep, working){
        console.log('hold for level 2 harvester');
    },

    run: function(creep){
        var isWorking = creep.memory.working;
        let rcl = creep.room.controller.level;
        if(creep.store[RESOURCE_ENERGY] == creep.store.getCapacity() && creep.memory.working == false){
            creep.memory.working = true;
        }
        else if(creep.store[RESOURCE_ENERGY] == 0 && creep.memory.working == true){
            creep.memory.working = false;
        }
        

        if(rcl == 1){
            this.rcl1(creep, isWorking);
        }
        else if(rcl == 2){
            this.rcl2(creep, isWorking);
        }

    }
}