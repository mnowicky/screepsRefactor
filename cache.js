module.exports = {
    cacheRoom: function (){
        if(!Memory.rooms){
            Memory.rooms = {};
        }

        for(let name in Game.rooms){
            if(!Memory.rooms[name]){
                Memory.rooms[name] = {};
                Memory.rooms[name].structures = {};
            }

            let rm = Game.rooms[name];
            Memory.rooms[name].rcl = rm.controller.level;
        }
    },

    cacheCreeps: function (){
        if(!Memory.creeps){
            Memory.creeps = {};
        }

        for(let name in Game.creeps){
            if(!Memory.creeps[name]){
                Memory.creeps[name] = {};
            }

            let creep = Game.creeps[name];
            Memory.creeps[creep].room = creep.room.name;
            
        }
    }, 

    cacheSpawns: function(){
        if(!Memory.spawns){
            Memory.spawns = {};
        }

        for(let name in Game.spawns){
            let spawn = Game.spawns[name];
            if(!Memory.spawns[name]){
                Memory.spawns[name] = {};
            }

            Memory.spawns[name].name = spawn.name;
            Memory.spawns[name].room = spawn.room.name;
        }
    },

    cacheAll: function(){
        this.cacheRoom();
        this.cacheCreeps();
        this.cacheSpawns();
    }
}