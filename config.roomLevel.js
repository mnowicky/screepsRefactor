var rmLvlConfig = {
    1: {
        harvester: {
            qty: 4,
            body: '[WORK, CARRY, MOVE]',
            bodyCost: 200,
            role: 'harvester'
        },
        upgrader: {
            qty: 2, 
            body: '[WORK, CARRY, MOVE]',
            bodyCost: 200, 
            role: 'upgrader'
        },
        builder: {
            qty: 2, 
            body: '[WORK, CARRY, MOVE]',
            bodyCost: 200,
            role: 'builder'
        }
    }, 
    2: {
        harvester: {
            qty: 2,
            body: '[WORK,WORK,CARRY,CARRY,MOVE,MOVE]',
            bodyCost: 400
        }
    }
}

module.exports = rmLvlConfig;
