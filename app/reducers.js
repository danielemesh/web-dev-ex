import expect from "expect";
import deepFreeze from "deep-freeze-strict";

import { combineReducers } from 'redux';

import { SELECT_TIME, selectTime, TOGGLE_DEVICE, toggleDevice } from "./actions";

const deviceReducer = (state = {}, action) => {
    switch (action.type) {
        case TOGGLE_DEVICE:
            if (state.id !== action.deviceId) {
                return state;
            }
            return Object.assign({}, state, {
                active: state.active === 0 ? 1 : 0
            });
        default:
            return state;
    }
};

const devicesReducer = (state = [], action) => {
    switch (action.type) {
        case TOGGLE_DEVICE:
            return state.map(d => deviceReducer(d, action));
        default:
            return state;
    }
};

const groupReducer = (state = {}, action) => {
    switch (action.type) {
        case TOGGLE_DEVICE:
            if (state.id !== action.groupId) {
                return state;
            }
            return Object.assign({}, state, {
                devices: devicesReducer(state.devices, action)
            });
        default:
            return state;
    }
};

const groups = (state = [], action) => {
    switch (action.type) {
        case TOGGLE_DEVICE:
            return state.map(g => groupReducer(g, action));
        default:
            return state;
    }
};

const times = (state = 1, action) => {
    switch (action.type) {
        case SELECT_TIME:
            return action.id;
        default:
            return state;
    }
};

const testToggleDevice = () => {
    const stateBefore = [{
        "id":      "1",
        "name":    "group 1",
        "devices": [
            {
                "id":     11,
                "name":   "device 11",
                "active": 1
            },
            {
                "id":     12,
                "name":   "device 12",
                "active": 0
            }
        ]
        
    }];
    const action      = toggleDevice("1", 11);
    const stateAfter  = [{
        "id":      "1",
        "name":    "group 1",
        "devices": [
            {
                "id":     11,
                "name":   "device 11",
                "active": 0
            },
            {
                "id":     12,
                "name":   "device 12",
                "active": 0
            }
        ]
        
    }];
    
    deepFreeze(stateBefore);
    deepFreeze(action);
    
    expect(groups(stateBefore, action)).toEqual(stateAfter);
};

const testSelectTime = () => {
    const stateBefore = {};
    const action      = selectTime(2);
    const stateAfter  = 2;
    
    deepFreeze(stateBefore);
    deepFreeze(action);
    
    expect(times(stateBefore, action)).toEqual(stateAfter);
};

export const app = combineReducers({
    groups,
    times
});

testToggleDevice();
testSelectTime();


console.debug("All tests passed!");