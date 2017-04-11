import expect from 'expect';
import deepFreeze from 'deep-freeze-strict';

import { TOGGLE_PROTOCOL, CLEAR_ALL, toggleProtocol, clearAll } from "../actions";


const protocol = (state = {}, action) => {
    switch (action.type) {
        case TOGGLE_PROTOCOL:
            if (state.id !== action.id) {
                return state;
            }
            return Object.assign({}, state, {
                active: state.active === 0 ? 1 : 0
            });
        case CLEAR_ALL:
            return Object.assign({}, state, {
                active: 0
            });
        default:
            return state;
    }
};

export const protocols = (state = [], action) => {
    switch (action.type) {
        case TOGGLE_PROTOCOL:
        case CLEAR_ALL:
            return state.map(p => protocol(p, action));
        default:
            return state;
    }
};

const testToggleProtocol = () => {
    const stateBefore = [{
        "id"  : 1,
        "name": "Modbus",
        active: 0
    }, {
        "id"  : 2,
        "name": "DNP 3",
        active: 0
    }, {
        "id"  : 3,
        "name": "IEC104",
        active: 0
    }, {
        "id"  : 4,
        "name": "MMS",
        active: 0
    }];
    const action      = toggleProtocol(2);
    const stateAfter  = [{
        "id"  : 1,
        "name": "Modbus",
        active: 0
    }, {
        "id"  : 2,
        "name": "DNP 3",
        active: 1
    }, {
        "id"  : 3,
        "name": "IEC104",
        active: 0
    }, {
        "id"  : 4,
        "name": "MMS",
        active: 0
    }];
    
    deepFreeze(stateBefore);
    deepFreeze(action);
    
    expect(protocols(stateBefore, action)).toEqual(stateAfter);
};

const testClearAll = () => {
    const stateBefore = [{
        "id"  : 1,
        "name": "Modbus",
        active: 1
    }, {
        "id"  : 2,
        "name": "DNP 3",
        active: 1
    }, {
        "id"  : 3,
        "name": "IEC104",
        active: 0
    }, {
        "id"  : 4,
        "name": "MMS",
        active: 1
    }];
    const action      = clearAll();
    const stateAfter  = [{
        "id"  : 1,
        "name": "Modbus",
        active: 0
    }, {
        "id"  : 2,
        "name": "DNP 3",
        active: 0
    }, {
        "id"  : 3,
        "name": "IEC104",
        active: 0
    }, {
        "id"  : 4,
        "name": "MMS",
        active: 0
    }];
    
    deepFreeze(stateBefore);
    deepFreeze(action);
    
    expect(protocols(stateBefore, action)).toEqual(stateAfter);
};

testToggleProtocol();
testClearAll();
console.debug("Protocols tests passed!");
