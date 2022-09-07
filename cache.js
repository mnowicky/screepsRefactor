var utils = require('utils');

module.exports = {
    cacheRoom: function (){
        //cache room details to memory
        for(let name in Game.rooms){
            let rm = Game.rooms[name];
            var sources = rm.find(FIND_SOURCES);

            if(!Memory.rooms[name]){
                Memory.rooms[name] = {};
                Memory.rooms[name].structures = {};
                Memory.rooms[name].rcl = rm.controller.level;

                //cache room sources and their surrounding terrain
                Memory.rooms[name].sources = [];
                var openPositionsCount = [];

                for(source of sources){
                    Memory.rooms[name].sources.push(source);
                    
                    //returns array of position tile types (swamp, wall, plains)
                    var positionTypes = utils.returnSurroundingTerrain(source);
                    var count = 0;

                    //count number of type types considered 'open' and count them, push to array
                    for(c = 0; c < positionTypes.length; c++){
                        if(positionTypes[c] == "plain" || positionTypes[c] == "swamp"){
                            count++;
                        }
                    }
                    openPositionsCount.push(count);

                    //write the open positions count to memory for each source
                    for(i=0;i<openPositionsCount.length;i++){
                        Memory.rooms[name].sources[i].openPositions = openPositionsCount[i];
                    }
                }
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
                Memory.spawns[name].queue = ['harvester'];
            }
        }
    },

    cacheAll: function(){
        if(!Memory.spawns){
            console.log('Cacheing spawns...');
            //console.log(Memory.spawns.Spawn1.name);
            Memory.spawns = {};
            this.cacheSpawns();
        }

        if(!Memory.rooms){
            console.log('Cacheing rooms...');
            Memory.rooms = {};
            this.cacheRoom();
        }

        if(Game.time % 50 === 0){
            console.log('Cacheing creeps...');
            if(!Memory.creeps){
                Memory.creeps = {};
            }
            this.cacheCreeps();
        }
    }
}