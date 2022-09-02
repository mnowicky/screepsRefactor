require('spawn.buildCreeps');
var buildCreep = require('spawn.buildCreeps');

module.exports = {
    runQueues: function(){
        for(let spawnName in Game.spawns){
            console.log('spawnName:'+spawnName);
            let spawn = Game.spawns[spawnName];
            let sName = spawn.name;
            let queue = spawn.memory.queue;
            let rmName = spawn.room.name;
            var energyAvailable = spawn.room.energyAvailable;
            var energyCapacity = spawn.room.energyCapacityAvailable;
            var name = undefined;
            console.log(rmName);
            var rm = Game.rooms[rmName];
            var energyAvail = rm.energyAvailable;
            console.log('rm:'+rm);
            console.log('energy:' + energyAvail);
            if(queue.length>0){
                let firstInLine = queue[0];
                console.log('energyAvailable:'+energyAvailable);
                console.log('energyCapacity:'+energyCapacity);
                name = buildCreep.genBalancedCreep(energyAvailable, firstInLine, sName, spawn);
                console.log(name);
                if(spawn.spawning == true){
                    queue.shift();
                }
            }



            //console.log('hi');
            //console.log(firstPos);
            //console.log(spawn);
        }
    }
}