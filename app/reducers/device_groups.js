import expect from "expect";
import deepFreeze from "deep-freeze-strict";

import { TOGGLE_DEVICE, toggleDevice } from "../actions";

const device = (state = {}, action) => {
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

const devices = (state = [], action) => {
    switch (action.type) {
        case TOGGLE_DEVICE:
            return state.map(d => device(d, action));
        default:
            return state;
    }
};

const group = (state = {}, action) => {
    switch (action.type) {
        case TOGGLE_DEVICE:
            if (state.id !== action.groupId) {
                return state;
            }
            return Object.assign({}, state, {
                devices: devices(state.devices, action)
            });
        default:
            return state;
    }
};

export const groups = (state = [], action) => {
    switch (action.type) {
        case TOGGLE_DEVICE:
            return state.map(g => group(g, action));
        default:
            return state;
    }
};

const testToggleDevice = () => {
    const stateBefore = [{
        "id"     : "1",
        "name"   : "group 1",
        "devices": [
            {
                "id"    : 11,
                "name"  : "device 11",
                "active": 1
            },
            {
                "id"    : 12,
                "name"  : "device 12",
                "active": 0
            }
        ]
        
    }];
    const action      = toggleDevice("1", 11);
    const stateAfter  = [{
        "id"     : "1",
        "name"   : "group 1",
        "devices": [
            {
                "id"    : 11,
                "name"  : "device 11",
                "active": 0
            },
            {
                "id"    : 12,
                "name"  : "device 12",
                "active": 0
            }
        ]
        
    }];
    
    deepFreeze(stateBefore);
    deepFreeze(action);
    
    expect(groups(stateBefore, action)).toEqual(stateAfter);
};

testToggleDevice();
console.debug("Device groups tests passed!");
