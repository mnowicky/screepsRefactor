module.exports = {
    run: function(spawn){
        let rmName = spawn.room.name;
        let rcl = spawn.room.controller.level;
        let lowRCL = Memory.rooms[rmName].lowRCL;
        if(!Memory.rooms[rmName].creepMinimums){
            Memory.rooms[rmName].creepMinimums = {};

            if(lowRCL == true){
                if(!Memory.rooms[rmName].creepMinimums.minHarvesters){
                    var count = 0;
                    let sources = Memory.rooms[rmName].sources;
                    for(src of sources){
                        let openPos = Number(src.openPositions);
                        count = count+openPos;
                    }
                    Memory.rooms[rmName].creepMinimums.minHarvesters = count;
                }
                if(!Memory.rooms[rmName].creepMinimums.minBuilders){
                    let cSites = spawn.room.find(FIND_CONSTRUCTION_SITES);
                    let numCSites = cSites.length;
                    //console.log('numCSites: '+numCSites);
                    if(!numCSites){
                        var numBuilders = 1;
                    }
                    else if(numCSites > 0 && numCSites < 5){
                        var numBuilders = 2;
                    }
                    else if(numCSites >=5){
                        var numBuilders = 4;
                    }
                    Memory.rooms[rmName].creepMinimums.minBuilders = numBuilders;
                }
                if(!Memory.rooms[rmName].creepMinimums.minUpgraders){
                    if(rcl >= 3){
                        var numUpgraders = 2;
                    }
                    else{
                        var numUpgraders = 0;
                    }
                    Memory.rooms[rmName].creepMinimums.minUpgraders = numUpgraders;
                }
            }
        }
    }
}