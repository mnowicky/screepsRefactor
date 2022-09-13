module.exports = {
    rcl1_2: function(creep, working){
        //check if rcl changed, if yes set 
        /*
        if(creep.memory.roomRCL != creep.room.controller.level){
            creep.memory.buildNewStructures = true;
        }
        else{
            creep.memory.buildNewStructures = false;
        }
        */

        if(working == true){
            delete creep.memory.harvestSource;
            if(!creep.memory.constructionSite){
                let closestSite = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
                if(closestSite){
                    creep.memory.constructionSite = closestSite.id;
                }
            }
            let cSite = Game.getObjectById(creep.memory.constructionSite);
            if(cSite){
                if(creep.build(cSite) == ERR_NOT_IN_RANGE){
                    creep.moveTo(cSite);
                }
                return;
            }
            else{
                delete creep.memory.contructionSite;
                if(creep.upgradeController(creep.room.controller) != OK){
                    creep.moveTo(creep.room.controller);
                }
            }
        }
        else if(working == false){
            let sources = creep.room.memory.sources;
            delete creep.memory.constructionSite;
            if(!creep.memory.harvestSource){
                for(s of sources){
                    let sourceId = s.id
                    let sourceObj = Game.getObjectById(sourceId);
                    if(sourceObj.energy > 0){
                        creep.memory.harvestSource = sourceId;
                    }
                }
                return;
            }
            let source = Game.getObjectById(creep.memory.harvestSource);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE){
                creep.moveTo(source);
            }
            else if(creep.harvest(source) == ERR_NOT_ENOUGH_RESOURCES){
                delete creep.memory.harvestSource;
            }

            let roads = creep.pos.findInRange(FIND_STRUCTURES, 1, {filter: (s) => s.structureType == STRUCTURE_ROAD});
            if(roads.length == 0 || !roads.length){
                let posX = creep.pos.x;
                let posY = creep.pos.y;
                creep.room.createConstructionSite(posX, posY, STRUCTURE_ROAD);
            }
        }
    },

    checkNewAvailableStructures: function(creep){
        console.log('placeholder');
    },

    run: function(creep){
        var working = creep.memory.working;
        var rcl = creep.room.controller.level;
        //cache rcl so creep knows when more upgrades/structures are available
        if(!creep.memory.roomRCL){
            creep.memory.roomRCL = rcl;
        }
        if(creep.store[RESOURCE_ENERGY] == creep.store.getCapacity() && creep.memory.working == false){
            creep.memory.working = true;
        }
        else if(creep.store[RESOURCE_ENERGY] == 0 && creep.memory.working == true){
            creep.memory.working = false;
        }

        if(!creep.memory.constructionSites){
            var cSites = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
            if(cSites.length){
                cSiteArr = [];
                for(cSite of cSites){
                    cSiteArr.push(cSite.id);
                }
                creep.memory.constructionSites = cSiteArr;
            }
            else{
                creep.memory.constructionSites = 'none';
            }
        }

        if(rcl != creep.memory.roomRCL){
            this.checkNewAvailableStructures(creep);
        }

        if(rcl == 1 || rcl == 2){
            this.rcl1_2(creep, working);
        }
    }
}