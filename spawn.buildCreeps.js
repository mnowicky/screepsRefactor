module.exports = {
    genBalancedCreep: function(energy, roleName, spawnName, spawnObj){
        var spwn = spawnObj;

        var numParts = Math.floor(energy / 200);
        console.log(numParts);
        numParts = Math.min(numParts,16);
        var body = [];
        for(let i = 0; i  < numParts; i++){
            body.push(WORK);
        }
        for(let i = 0; i < numParts; i++){
            body.push(CARRY);
        }
        for(let i = 0; i < numParts; i++){
            body.push(MOVE);
        }
        console.log(body);
        return spwn.spawnCreep(body, roleName+'_'+this.makeId(6), {memory: {role: roleName, working: false, spawn: spawnName}});
    }, 
    makeId: function(length){
        var res = '';
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var charLength = chars.length;
        for(let i = 0; i < length; i++){
            res += chars.charAt(Math.floor(Math.random() * charLength));
        }
        return res;
    }
}