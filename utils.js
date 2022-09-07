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
    returnAdjacentRoom: function(rmName){
        var nameArr = [];
        var adjacentRoomChoices = [];
        for(char of rmName){
            nameArr.push(char);
        }
        console.log(nameArr);
        var directionX = nameArr[0];
        var numeralX = Number(nameArr[1]);
        console.log(numeralX+1);
        var directionY = nameArr[2];
        var numeralY = Number(nameArr[3]);

        if(numeralX > 0 && numeralY > 0){
            console.log('true');
            var north = directionX+numeralX+directionY+(numeralY+1);
            var south = String(directionX+numeralX+directionY+(numeralY-1));
            var east = String(directionX+(numeralX-1)+directionY+numeralY);
            var west = String(directionX+(numeralX+1)+directionY+numeralY);
            console.log(north + ' ' + south + ' ' + east + ' ' + west);

        }

        adjacentRoomChoices = [north, south, east, west];
        let randomIndex = this.returnRandomNumberInRange(0,3);
        let randomRoomChoice = adjacentRoomChoices[randomIndex];
        console.log(randomRoomChoice);
        return randomRoomChoice;



    }, 
    returnRandomNumberInRange: function(min, max){
        return Math.random() * (max-min) + min;
    }
}