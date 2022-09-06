module.exports = {
    purgeCreeps: function(){
        //remove dead creeps from memory
        for(let name in Memory.creeps){
            if(Game.creeps[name] == undefined){
                delete Memory.creeps[name];
            }
        }
    },

    purgeRooms: function(){
        delete Memory.rooms;
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
        if(Game.time % 100 === 0){
            this.purgeSpawns();
        }
        if(Game.time % 500 === 0){
            this.purgeRooms();
        }
        if(Game.time % 25 === 0){
            this.purgeCreeps();
        }
    }
}