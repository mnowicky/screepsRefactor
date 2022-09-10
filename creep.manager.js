var utils = require('utils');
const cache = require('./cache');

module.exports = {
    harvesterAssignSource(creep){
        if(!creep.memory.sourceAssignment){
            var roomName = creep.room.name;
            var sources = Memory.rooms[roomName].sources;
    
            //for each source cached in memory
            for(s=0;s<sources.length;s++){
                var assignments = 0;
                //retrieve number of open positions around it
                //console.log(Memory.rooms[roomName].sources[s]);
                let openPositions = Memory.rooms[roomName].sources[s].openPositions;
                //for each existing creep in the game, check for memory assignment matching that source id
                for(var name in Game.creeps){
                    var existingCreeps = Game.creeps[name];
                    //for each matching creep assigned to a specific source id, iterate the counter.
                    if(existingCreeps.memory.sourceAssignment == sources[s].id){
                        assignments++;
                        //if number of creeps assigned to a source == number of open positions, do nothing
                        if(assignments >= openPositions){
                            creep.memory.sourceAssignment = 'searching...';
                            break
                        };
                    }
                }
                if(assignments < openPositions){
                    creep.memory.sourceAssignment = sources[s].id;
                    break;
                }
                else{
                    var assigned = false;
                    for(var name in Game.creeps){
                        var existingCreeps = Game.creeps[name];
                        if(existingCreeps.memory.sourceAssignment == sources[s].id){
                            assigned = true;
                            break;
                        }
                    }
                }
                if(assigned == false){
                    creep.memory.assigned = sources[s].id;
                    break;
                }
            }
        }
    }, 
    findExternalSources: function(creep){
        var creepSpawn = creep.memory.spawn;
        var homeRoom = Game.spawns[creepSpawn].room.name;
        var currentRoom = creep.room.name;
        if(!creep.memory.roomsExplored){
            creep.memory.roomsExplored = [homeRoom];
        }
        if(!creep.memory.currentRoom){
            creep.memory.currentRoom = currentRoom;
        }
        //if not in homeroom, or previous current room, if currentroom is not cached, cache the room.
        if(currentRoom != homeRoom || creep.room.name !== creep.memory.currentRoom){
            creep.memory.currentRoom = creep.room.name;
            creep.memory.roomsExplored.push(creep.room.name);
        }
        if(!creep.memory.targetRoom){
            var randomAdjacentRoom = utils.returnRandomRoomWithExit(currentRoom);
            if(randomAdjacentRoom !== homeRoom && creep.memory.roomsExplored.includes(randomAdjacentRoom) == false){
                creep.memory.targetRoom = randomAdjacentRoom;
            }
            return;
        }
        else if(creep.memory.targetRoom == homeRoom){
            delete creep.memory.targetRoom;
        }

        if(creep.room.name != creep.memory.targetRoom){
            let targetRm = creep.memory.targetRoom;
            creep.moveTo(new RoomPosition(25, 25, targetRm));
            return;
        }
    }
}