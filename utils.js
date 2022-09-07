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
    }
}