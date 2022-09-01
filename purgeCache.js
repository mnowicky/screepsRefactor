module.exports = {
    purgeCreeps: function(){
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
        for(let spawn in Memory.spawns){
            if(Game.spawns[spawn] == undefined){
                delete Memory.spawns[spawn];
            }
        }
    },

    purgeAll: function(){
        if(Game.time % 100 === 0){
            console.log('purging cache...');
            this.purgeRooms();
            this.purgeSpawns();
        }
        if(Game.time % 10 === 0){
            this.purgeCreeps();
        }
    }
}