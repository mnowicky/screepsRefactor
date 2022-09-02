var settings = require('config.settings');


module.exports = {
    cacheRoom: function (){
        //cache room details to memory
        for(let name in Game.rooms){
            let rm = Game.rooms[name];
            if(!Memory.rooms[name]){
                Memory.rooms[name] = {};
                Memory.rooms[name].structures = {};
                Memory.rooms[name].rcl = rm.controller.level;
            }
        }
    },

    cacheCreeps: function (){
        for(let name in Game.creeps){
            //let creep = Game.creeps[name];
            if(!Memory.creeps[name]){
                Memory.creeps[name] = {};
            }
        }
    }, 

    cacheSpawns: function(){
        //cache spawns to memory
        for(let name in Game.spawns){
            let spawn = Game.spawns[name];
            if(!Memory.spawns[name]){
                Memory.spawns[name] = {};
                Memory.spawns[name].name = spawn.name;
                Memory.spawns[name].room = spawn.room.name;
                Memory.spawns[name].queue = ['empty'];
            }
        }
    },

    cacheAll: function(){
        //delete Memory.spawns;
        if(!Memory.rooms){
            console.log('Cacheing rooms...');
            Memory.rooms = {};
            this.cacheRoom();
        }

        if(Game.time % 50 === 0){
            console.log('Re-cacheing creeps...');
            if(!Memory.creeps){
                Memory.creeps = {};
            }
            this.cacheCreeps();
        }

        if(!Memory.spawns){
            console.log('Re-cacheing spawns...');
            Memory.spawns = {};
            this.cacheSpawns();
        }
        /*
        if(Game.time % 250 === 0 || !Memory.spawns){
            console.log('Re-cacheing spawns...');
            if(!Memory.spawns){
                Memory.spawns = {};
            }
            this.cacheSpawns();
        }*/
    }
}