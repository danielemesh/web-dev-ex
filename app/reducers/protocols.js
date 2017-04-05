import expect from 'expect';
import deepFreeze from 'deep-freeze-strict';

import { TOGGLE_PROTOCOL, toggleProtocol } from "../actions";


const protocol = (state = {}, action) => {
    switch (action.type) {
        case TOGGLE_PROTOCOL:
            if (state.id !== action.id) {
                return state;
            }
            return Object.assign({}, state, {
                active: state.active === 0 ? 1 : 0
            });
        default:
            return state;
    }
};

export const protocols = (state = [], action) => {
    switch (action.type) {
        case TOGGLE_PROTOCOL:
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

testToggleProtocol();
console.debug("Protocols tests passed!");
