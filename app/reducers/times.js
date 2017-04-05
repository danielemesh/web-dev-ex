import expect from 'expect';
import deepFreeze from 'deep-freeze-strict';

import { SELECT_TIME, selectTime } from "../actions";


export const times = (state = {}, action) => {
    switch (action.type) {
        case SELECT_TIME:
            return Object.assign({}, state, {
                selectedTime: action.id
            });
        default:
            return state;
    }
};

const testSelectTime = () => {
    const stateBefore = {
        byId        : {
            1: {
                "id"  : 1,
                "name": "Last 30 minutes"
            },
            2: {
                "id"  : 2,
                "name": "Last Hour"
            },
            3: {
                "id"  : 3,
                "name": "Last 8 hours"
            },
            4: {
                "id"  : 4,
                "name": "Last 24 hours"
            }
        },
        selectedTime: 0
    };
    const action      = selectTime(2);
    const stateAfter  = {
        byId        : {
            1: {
                "id"  : 1,
                "name": "Last 30 minutes"
            },
            2: {
                "id"  : 2,
                "name": "Last Hour"
            },
            3: {
                "id"  : 3,
                "name": "Last 8 hours"
            },
            4: {
                "id"  : 4,
                "name": "Last 24 hours"
            }
        },
        selectedTime: 2
    };
    
    deepFreeze(stateBefore);
    deepFreeze(action);
    
    expect(times(stateBefore, action)).toEqual(stateAfter);
};

testSelectTime();
console.debug("Times tests passed!");