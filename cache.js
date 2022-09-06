var settings = require('config.settings');


module.exports = {
    cacheRoom: function (){
        //cache room details to memory
        for(let name in Game.rooms){
            let rm = Game.rooms[name];
            var sources = rm.find(FIND_SOURCES);
            var terrain = rm.getTerrain();
            if(!Memory.rooms[name]){
                Memory.rooms[name] = {};
                Memory.rooms[name].structures = {};
                Memory.rooms[name].rcl = rm.controller.level;
                Memory.rooms[name].sources = [];
                Memory.rooms[name].terrain = terrain;
                Memory.rooms[name].sourcesSurroundingTerrain = [];
                for(source of sources){
                    Memory.rooms[name].sources.push(source);
                }
                for(s of Memory.rooms[name].sources){
                    let surroundingTerrain = this.returnSurroundingTerrain(s.pos.x, s.pos.y);
                    Memory.rooms[name].sourcesSurroundingTerrain = surroundingTerrain;


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

    returnSurroundingTerrain: function(x, y){
        let surroundingArray = [];
        let surroundingArrayTerrain = [];
        let pos1 = {x: x+1, y: y};
        let pos2 = {x: x+1, y: y-1};
        let pos3 = {x: x, y: y-1};
        let pos4 = {x: x-1, y: y-1};
        let pos5 = {x: x-1, y: y};
        let pos6 = {x: x-1, y: y+1};
        let pos7 = {x: x, y: y+1};
        let pos8 = {x: x+1, y: y+1};
        surroundingArray = [pos1, pos2, pos3, pos4, pos5, pos6, pos7, pos8];

        for(pos of surroundingArray){
            switch(terrain.get(pos[x], pos[y])){
                case TERRAIN_MASK_WALL:
                    surroundingArrayTerrain.push('WALL');
                case TERRAIN_MASK_SWAMP:
                    surroundingArrayTerrain.push('OPEN');
                case 0:
                    surroundingArrayTerrain.push('OPEN');
            }

        }
        return surroundingArrayTerrain;

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