module.exports = {
    purgeCreeps: function(){
        //remove dead creeps from memory
        for(let name in Memory.creeps){
            if(Game.creeps[name] == undefined){
                delete Memory.creeps[name];
            }
        }
        delete Memory.creepMinimums;
    },

    purgeSpawns: function(){
        //remove destroyed spawns from memory
        for(let spawn in Memory.spawns){
            if(Game.spawns[spawn] == undefined){
                delete Memory.spawns[spawn];
            }
        }
    },

    purgeAll: function(){
        RawMemory.set('{}');
        Memory.creeps = {};
        Memory.rooms = {};
        Memory.flags = {};
        Memory.spawns = {};
        Memory.creepMinimums = {};
    },

    cleanMemory: function(){
        if(Game.time % 100 === 0){
            this.purgeSpawns();
        }
        if(Game.time % 25 === 0){
            this.purgeCreeps();
        }
        if(Game.time % 1000 === 0){
            this.purgeAll();
        }
    }
}