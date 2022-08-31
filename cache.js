modeule.exports = {
    cacheRoom: function (){
        for(let name in Game.rooms){
            if(!Memory.rooms[name]){
                Memory.rooms[name] = {};
                Memory.rooms[name].structures = {};
            }

            Memory.rooms[name].rcl = Game.rooms[name].controller.level;
        }
    }
}