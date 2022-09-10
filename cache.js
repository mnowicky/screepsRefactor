var utils = require('utils');

module.exports = {
    cacheRoom: function (){
        //cache room details to memory
        for(let name in Game.rooms){
            let rm = Game.rooms[name];
            var rmName = rm.name;
            var isMyRoom = Game.rooms[rmName] && Game.rooms[rmName].controller && Game.rooms[rmName].controller.my;
            if(isMyRoom){
                var rcl = rm.controller.level;
            }
            var sources = rm.find(FIND_SOURCES);


            if(!Memory.utils){
                Memory.utils = {};
                Memory.utils.initMemWipe = true;
            }
            if(!Memory.rooms[name]){
                Memory.rooms[name] = {};
                Memory.rooms[name].structures = {};
                if(isMyRoom){
                    Memory.rooms[name].rcl = rcl;
                    if(rcl && rcl < 4){
                        Memory.rooms[name].lowRCL = true;
                    }
                    else if(rcl && rcl >= 4){
                        Memory.rooms[name].lowRCL = false;
                    }
                }
                else{
                    Memory.rooms[name].lowRCL = 'unowned';
                }

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

                //cache surrounding rooms
                let exits = utils.returnExits(rmName)
                let exitsArr = [];
                Memory.rooms[name].exits = {};
                if(exits[1]){
                    Memory.rooms[name].exits.top = exits[1];
                    exitsArr.push(exits[1]);
                }
                if(exits[3]){
                    Memory.rooms[name].exits.right = exits[3];
                    exitsArr.push(exits[3]);
                }
                if(exits[5]){
                    Memory.rooms[name].exits.bottom = exits[5];
                    exitsArr.push(exits[5]);
                }
                if(exits[7]){
                    Memory.rooms[name].exits.left = exits[7];
                    exitsArr.push(exits[7]);
                }
                Memory.rooms[name].adjacentRooms = exitsArr;
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

    manuallyCacheRoom: function(rmName){
        rm = Game.rooms[rmName];
        var sources = rm.find(FIND_SOURCES);
        if(!Memory.rooms[rmName]){
            Memory.rooms[rmName] = {};
            Memory.rooms[rmName].lowRCL = true;
            Memory.rooms[rmName].sources = [];
            var openPositionsCount = [];

            for(source of sources){
                Memory.rooms[rmName].sources.push(source);
                
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
                    Memory.rooms[rmName].sources[i].openPositions = openPositionsCount[i];
                }
            }

            //cache surrounding rooms
            let exits = utils.returnExits(rmName)
            let exitsArr = [];
            Memory.rooms[rmName].exits = {};
            if(exits[1]){
                Memory.rooms[rmName].exits.top = exits[1];
                exitsArr.push(exits[1]);
            }
            if(exits[3]){
                Memory.rooms[rmName].exits.right = exits[3];
                exitsArr.push(exits[3]);
            }
            if(exits[5]){
                Memory.rooms[rmName].exits.bottom = exits[5];
                exitsArr.push(exits[5]);
            }
            if(exits[7]){
                Memory.rooms[rmName].exits.left = exits[7];
                exitsArr.push(exits[7]);
            }
            Memory.rooms[rmName].adjacentRooms = exitsArr;

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