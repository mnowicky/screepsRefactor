var manager = require('creep.manager');
var cache = require('cache');

module.exports = {
    rcl1: function(creep, working){
        let spawn = creep.memory.spawn;
        if(working == true){
            let targets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_SPAWN 
                || s.structureType == STRUCTURE_EXTENSION
                || s.structureType == STRUCTURE_TOWER)
                && s.energy < s.energyCapacity
            });

            if(targets){
                if(creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(targets);
                    return;
                }
            }
            else{
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE){
                    creep.moveTo(creep.room.controller);
                }
            }
        }
        else if(working == false){
            if(creep.memory.sourceAssignment && creep.memory.sourceAssignment != 'searching...'){
                let src = Game.getObjectById(creep.memory.sourceAssignment);
                //move creeps back to target room after dropping off energy at home
                if(creep.memory.targetRoom){
                    let targetRoom = creep.memory.targetRoom;
                    //build roads leading back to external rooms;
                    let roads = creep.pos.findInRange(FIND_STRUCTURES, 2, {filter: (s) => s.structureType == STRUCTURE_ROAD});
                    console.log(roads);
                    console.log(roads.length);
                    console.log(!roads.length);
                    if(roads.length == 0 || !roads.length){
                        let posX = creep.pos.x;
                        let posY = creep.pos.y;
                        creep.room.createConstructionSite(posX, posY, STRUCTURE_ROAD);
                    }
                    //move back to external room;
                    if(creep.room.name !== targetRoom){
                        creep.moveTo(new RoomPosition(25, 25, targetRoom));
                    }
                }
                else{
                    if(creep.harvest(src)!=OK){
                        creep.moveTo(src);
                    }
                }
            }
            else{
                manager.findExternalSources(creep);
            }
        }
        
    }, 
    rcl2: function(creep, working){
        console.log('hold for level 2 harvester');
    },

    harvestForeignRoom: function(creep, working){
        if(working == true){
            let spawn = creep.memory.spawn;
            let homeRoom = Memory.spawns[spawn].room;

            if(creep.room.name != homeRoom){
                creep.moveTo(new RoomPosition(25, 25, homeRoom));
                return;
            }
        }
        else if(working == false){
            if(creep.memory.sourceAssignment && creep.memory.sourceAssignment != 'searching...'){
                let src = Game.getObjectById(creep.memory.sourceAssignment);
                if(creep.harvest(src) != OK){
                    creep.moveTo(src);
                }
            }
        }

    },

    run: function(creep){
        var isWorking = creep.memory.working;
        var roomName = creep.room.name;
        //determine if harvester is in a claimed room or not
        var inClaimedRoom = Game.rooms[roomName] && Game.rooms[roomName].controller && Game.rooms[roomName].controller.my;
        if(inClaimedRoom){
            var rcl = creep.room.controller.level;
        }

        //working or not working
        if(creep.store[RESOURCE_ENERGY] == creep.store.getCapacity() && creep.memory.working == false){
            creep.memory.working = true;
        }
        else if(creep.store[RESOURCE_ENERGY] == 0 && creep.memory.working == true){
            creep.memory.working = false;
        }
        
        //logic for in a claimed room
        if(inClaimedRoom){
            //assign a source to harvest
            manager.harvesterAssignSource(creep);
            //run rcl dependent logic
            if(rcl == 1 || rcl == 2){
                this.rcl1(creep, isWorking);
            }
        }
        //logic for in a foreign room
        else{
            //move off of the edge
            if(creep.pos.x == 0 || creep.pos.y == 0 || creep.pos.x == 49 || creep.pos.y == 49){
                console.log('im on the edge!!');
                creep.moveTo(new RoomPosition(25,25, creep.room.name));
                return;
            }
            //cache room
            if(!Memory.rooms[creep.room.name]){
                cache.manuallyCacheRoom(creep.room.name);
            }

            //determine if room is a highway
            let charArr = [];
            for(char of creep.room.name){
                charArr.push(char);
            }
            //if it is a highway, keep exploring until you find a source room
            if((charArr[1] == 0 || charArr[1] % 10 === 0) || (charArr[3] == 0 || charArr[3] % 10 === 0)){
                if(creep.memory.targetRoom && creep.memory.targetRoom == creep.room.name){
                    delete creep.memory.targetRoom;
                }
                manager.findExternalSources(creep);
            }
            if(creep.memory.sourceAssignment == 'searching...'){
                manager.findExternalSources(creep);
                //return;
            }

            if(creep.memory.targetRoom && creep.room.name == creep.memory.targetRoom){
                if(creep.memory.sourceAssignment == 'searching...'){
                    manager.harvesterAssignSource(creep);
                }
                this.harvestForeignRoom(creep, isWorking);
            }
        }
    }
}