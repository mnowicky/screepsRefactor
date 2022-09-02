module.exports = {
    run: function(creep){
        let working = creep.memory.working;

        if(creep.store[RESOURCE_ENERGY] == creep.store.getCapacity() && creep.memory.working == false){
            creep.memory.working = true;
        }
        else if(creep.store[RESOURCE_ENERGY] == 0 && creep.memory.working == true){
            creep.memory.working = false;
        }

        if(working == true){
            creep.say('I am working!!');
            let targets = creep.pos.findClosestByRange(FIND_STRUCTURES => (c))
        }
        else{
            creep.say('I am not working!!');
            let src = creep.pos.findClosestByRange(FIND_SOURCES);
            console.log(src.id);
            let srcObj = Game.getObjectById(src.id);
            console.log(srcObj);
            if(creep.harvest(src) == ERR_NOT_IN_RANGE){
                creep.moveTo(src);
            }
        }
        
    }
}