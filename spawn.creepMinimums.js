module.exports = {
    run: function(spawn){
        let rmName = spawn.room.name;
        let lowRCL = Memory.rooms[rmName].lowRCL;
        if(!Memory.creepMinimums){
            Memory.creepMinimums = {};

            if(lowRCL == true){
                if(!Memory.creepMinimums.minHarvesters){
                    var count = 0;
                    let sources = Memory.rooms[rmName].sources;
                    for(src of sources){
                        let openPos = Number(src.openPositions);
                        count = count+openPos;
                    }
                    console.log(count);
                    Memory.creepMinimums.minHarvesters = count;
                }
                if(!Memory.creepMinimums.minBuilders){
                    let cSites = spawn.room.find(FIND_CONSTRUCTION_SITES);
                    let numCSites = cSites.length;
                    if(numCSites < 6){
                        var numBuilders = 2;
                    }
                    else if(numCSites >=6 && numCSites < 11){
                        var numBuilders = 3;
                    }
                }
            }
        }
    }
}