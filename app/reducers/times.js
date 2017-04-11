import expect from 'expect';
import deepFreeze from 'deep-freeze-strict';

import { SELECT_TIME, CLEAR_ALL, selectTime, clearAll } from "../actions/actions";


export const time = (state = {}, action) => {
    switch (action.type) {
        case SELECT_TIME:
            if (state.id !== action.id) {
                return Object.assign({}, state, {
                    active: 0
                });
            }
            return Object.assign({}, state, {
                active: 1
            });
        case CLEAR_ALL:
            return Object.assign({}, state, {
                active: 0
            });
        default:
            return state;
    }
};

export const times = (state = [], action) => {
    switch (action.type) {
        case SELECT_TIME:
        case CLEAR_ALL:
            return state.map(t => time(t, action));
        default:
            return state;
    }
};

const testSelectTime = () => {
    const stateBefore = [{
        "id"  : 1,
        "name": "Last 30 minutes",
        active: 1
    }, {
        "id"  : 2,
        "name": "Last Hour",
        active: 0
    }, {
        "id"  : 3,
        "name": "Last 8 hours",
        active: 0
    }, {
        "id"  : 4,
        "name": "Last 24 Hours",
        active: 0
    }];
    
    const action     = selectTime(2);
    const stateAfter = [{
        "id"  : 1,
        "name": "Last 30 minutes",
        active: 0
    }, {
        "id"  : 2,
        "name": "Last Hour",
        active: 1
    }, {
        "id"  : 3,
        "name": "Last 8 hours",
        active: 0
    }, {
        "id"  : 4,
        "name": "Last 24 Hours",
        active: 0
    }];
    
    deepFreeze(stateBefore);
    deepFreeze(action);
    
    expect(times(stateBefore, action)).toEqual(stateAfter);
};

const testClearAll = () => {
    const stateBefore = [{
        "id"  : 1,
        "name": "Last 30 minutes",
        active: 0
    }, {
        "id"  : 2,
        "name": "Last Hour",
        active: 0
    }, {
        "id"  : 3,
        "name": "Last 8 hours",
        active: 1
    }, {
        "id"  : 4,
        "name": "Last 24 Hours",
        active: 0
    }];
    const action      = clearAll();
    const stateAfter  = [{
        "id"  : 1,
        "name": "Last 30 minutes",
        active: 0
    }, {
        "id"  : 2,
        "name": "Last Hour",
        active: 0
    }, {
        "id"  : 3,
        "name": "Last 8 hours",
        active: 0
    }, {
        "id"  : 4,
        "name": "Last 24 Hours",
        active: 0
    }];
    
    deepFreeze(stateBefore);
    deepFreeze(action);
    
    expect(times(stateBefore, action)).toEqual(stateAfter);
};

testSelectTime();
testClearAll();
console.debug("Times tests passed!");