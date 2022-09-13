module.exports = {
    returnSurroundingTerrain: function(source){
        var res = [];
        let n = source.room.lookAt(source.pos.x, source.pos.y-1);
        let ne = source.room.lookAt(source.pos.x+1, source.pos.y-1);
        let e = source.room.lookAt(source.pos.x+1, source.pos.y);
        let se = source.room.lookAt(source.pos.x+1, source.pos.y+1);
        let s = source.room.lookAt(source.pos.x, source.pos.y+1);
        let sw = source.room.lookAt(source.pos.x-1, source.pos.y+1);
        let w = source.room.lookAt(source.pos.x-1, source.pos.y);
        let nw = source.room.lookAt(source.pos.x-1, source.pos.y-1);

        n.forEach(function(object){
            if(object.type == LOOK_TERRAIN){
                res.push(object[LOOK_TERRAIN]);
            }
        });

        ne.forEach(function(object){
            if(object.type == LOOK_TERRAIN){
                res.push(object[LOOK_TERRAIN]);
            }
        });

        e.forEach(function(object){
            if(object.type == LOOK_TERRAIN){
                res.push(object[LOOK_TERRAIN]);
            }
        });

        se.forEach(function(object){
            if(object.type == LOOK_TERRAIN){
                res.push(object[LOOK_TERRAIN]);
            }
        });

        s.forEach(function(object){
            if(object.type == LOOK_TERRAIN){
                res.push(object[LOOK_TERRAIN]);
            }
        });

        sw.forEach(function(object){
            if(object.type == LOOK_TERRAIN){
                res.push(object[LOOK_TERRAIN]);
            }
        });

        w.forEach(function(object){
            if(object.type == LOOK_TERRAIN){
                res.push(object[LOOK_TERRAIN]);
            }
        });

        nw.forEach(function(object){
            if(object.type == LOOK_TERRAIN){
                res.push(object[LOOK_TERRAIN]);
            }
        });
        return res;
    }, 
    returnAdjacentRooms: function(rmName){
        var nameArr = [];
        var adjacentRoomChoices = [];
        for(char of rmName){
            nameArr.push(char);
        }
        var directionX = nameArr[0];
        var numeralX = Number(nameArr[1]);
        var directionY = nameArr[2];
        var numeralY = Number(nameArr[3]);

        if(numeralX > 0 && numeralY > 0){
            var north = String(directionX+numeralX+directionY+(numeralY+1));
            var south = String(directionX+numeralX+directionY+(numeralY-1));
            var east = String(directionX+(numeralX-1)+directionY+numeralY);
            var west = String(directionX+(numeralX+1)+directionY+numeralY);
        }

        adjacentRoomChoices = [north, south, east, west];
        return adjacentRoomChoices;

    },
    returnRandomAdjacentRoom: function(rmName){
        let options = this.returnAdjacentRooms(rmName);
        let randomIndex = this.returnRandomNumberInRange(0,4);
        let randomRoomChoice = options[randomIndex];
        return randomRoomChoice;
    },
    returnRandomRoomWithExit: function(rmName){
        let index = Game.rooms[rmName].memory.adjacentRooms.length;
        let randomIndex = this.returnRandomNumberInRange(0, index);
        let adjacentRooms = Game.rooms[rmName].memory.adjacentRooms;
        return adjacentRooms[randomIndex];
    },
    returnRandomNumberInRange: function(min, max){
        return Math.floor(Math.random() * (max-min) + min);
    },
    returnExits: function(rmName){
        const exits = Game.map.describeExits(rmName);
        return exits;
    },

    initRoom: function(){
        if(hasRespawned() == true){
            return;
        }
    }, 
    createRoadFromTo: function(creep, posA, posB){
        //const direction = creep.pos.getDirectionTo(target);
        //creep.move(direction);
        //or
        //const path = creep.pos.findPathTo(targetPos, {ignoreCreeps:true, maxOps: 200});
        //or
        //const path = creep.pos.findPathTo(x, y, {opts:true});
        //or
        //const path = creep.pos.findPath(creepPos, targetPos, {opts: true});

        /*
        if(!path.length || !targetPos.isEqualTo(path[path.length-1])){
            path = creep.room.findPath(creep.pos, targetPos, {maxOps: 200, ignoreCreeps: true});
        }
        if(path.length){
            creep.move(path[0].direction);
        }
        */
       const path = creep.room.findPath(posA, posB);
       var pathArr = [];
       for(i=0; i<path.length; i++){
            var posX = path[i].x;
            var posY = path[i].y;
            var posArr = [posX, posY];
            pathArr.push(posArr);
       }
       console.log('Path array for createRoadFromTo: ' + pathArr);
       for(position of pathArr){
            creep.room.createContructionSite(position[0], position[1], STRUCTURE_ROAD);
       }
       return
       //creep.move(path[0].direction);
    }, 
    createRoadTo: function(creep, target){
        var path = creep.pos.findPathTo(target);
        var pathArr = [];
        for(i=0; i<path.length; i++){
            var posX = path[i].x;
            var posY = path[i].y;
            var posArr = [posX, posY];
            pathArr.push(posArr);
        }
        console.log('Path array for createRoadTo: '+ pathArr);
        for(pos of pathArr){
            creep.room.createContructionSite(pos[0], pos[1], STRUCTURE_ROAD);
        }
        return;
    },
    returnPathTo: function(creep, target){
        const path = creep.pos.findPathTo(target);
        return path;
    }
}