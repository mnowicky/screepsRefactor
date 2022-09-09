global.hasRespawned = function hasRespawned(){
    // check for multiple calls on same tick    
    if(Memory.respawnTick && Memory.respawnTick === Game.time) {
        return true;
    }
    // server reset or sim
    if(Game.time === 0) {
        Memory.respawnTick = Game.time;
        return true;
    }
    // check for 0 creeps
    for(const creepName in Game.creeps) {
        return false;
    }
    // check for only 1 room
    const rNames = Object.keys(Game.rooms);
    if(rNames.length !== 1) {
        return false;
    }
    // check for controller, progress and safe mode
    const room = Game.rooms[rNames[0]];
    if(!room.controller || !room.controller.my || room.controller.level !== 1 || room.controller.progress ||
       !room.controller.safeMode || room.controller.safeMode <= SAFE_MODE_DURATION-1) {
        return false;
    }
    // check for 1 spawn
    if(Object.keys(Game.spawns).length !== 1) {
        return false;
    }
    // if all cases point to a respawn, you've respawned
    Memory.respawnTick = Game.time;
    return true;
}

global.printResourceUsage = function(){
    global.memorySize = RawMemory.get().length;
	global.Memory = JSON.parse(RawMemory.get());
	console.log("overhead: "+Game.cpu.getUsed()+" for "+global.memorySize+" bytes");
}
