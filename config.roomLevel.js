var rmLvlConfig = {
    1: {
        harvester: {
            qty: 10,
            body: '[WORK, CARRY, MOVE]',
            bodyCost: 200,
            role: 'harvester'
        },
        upgrader: {
            qty: 0, 
            body: '[WORK, CARRY, MOVE]',
            bodyCost: 200, 
            role: 'upgrader'
        },
        builder: {
            qty: 0, 
            body: '[WORK, CARRY, MOVE]',
            bodyCost: 200,
            role: 'builder'
        }
    }, 
    2: {
        harvester: {
            qty: 8,
            body: '[WORK, CARRY, MOVE]',
            bodyCost: 200
        }, 
        upgrader: {
            qty: 0,
            body: '[WORK, CARRY, MOVE]', 
            bodyCost: 200
        }, 
        builder: {
            qty: 0,
            body: '[WORK,WORK,CARRY,CARRY,MOVE,MOVE]',
            bodyCost: 400
        }
    }
}

module.exports = rmLvlConfig;
