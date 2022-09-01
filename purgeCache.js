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
        /*for(let room in Memory.rooms){
            if(Game.rooms[room] == undefined){
                delete Memory.rooms[room];
            }
        }*/
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
        if(Game.time % 80 === 0){
            console.log('purging memory of destroyed spawns...');
            this.purgeRooms();
            this.purgeSpawns();
        }
        if(Game.time % 25 === 0){
            console.log('purging memory of dead creeps...');
            this.purgeCreeps();
        }
    }
}