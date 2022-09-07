module.exports = {
    harvesterAssignSource(creep){
        var roomName = creep.room.name;
        var sources = Memory.rooms[roomName].sources;

        //for each source cached in memory
        for(s=0;s<sources.length;s++){
            var assignments = 0;
            //retrieve number of open positions around it
            console.log(Memory.rooms[roomName].sources[s]);
            let openPositions = Memory.rooms[roomName].sources[s].openPositions;
            console.log('open positions 2: '+openPositions);
            //for each existing creep in the game, check for memory assignment matching that source id
            for(var name in Game.creeps){
                console.log(name);
                var existingCreeps = Game.creeps[name];
                //for each matching creep assigned to a specific source id, iterate the counter.
                if(existingCreeps.memory.sourceAssignment == sources[s].id){
                    assignments++;
                    //if number of creeps assigned to a source == number of open positions, do nothing
                    if(assignments == openPositions){
                        break
                    };
                }
                else{
                    if(assignments < openPositions){
                        creep.memory.sourceAssignment = sources[s].id;
                        creep.memory.isAssigned = true;
                        break;
                    }
                }
            }
        }
    }
}