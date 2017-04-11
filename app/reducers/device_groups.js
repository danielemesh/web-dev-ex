import expect from "expect";
import deepFreeze from "deep-freeze-strict";

import { TOGGLE_DEVICE, toggleDevice, clearAll, CLEAR_ALL, toggleGroup, TOGGLE_GROUP } from "../actions";

const device = (state = {}, action) => {
    switch (action.type) {
        case TOGGLE_DEVICE:
            if (state.id !== action.deviceId) {
                return state;
            }
            return Object.assign({}, state, {
                active: state.active === 0 ? 1 : 0
            });
        case TOGGLE_GROUP:
            return Object.assign({}, state, {
                active: action.active
            });
        case CLEAR_ALL:
            return Object.assign({}, state, {
                active: 0
            });
        default:
            return state;
    }
};

const devices = (state = [], action) => {
    switch (action.type) {
        case TOGGLE_DEVICE:
        case TOGGLE_GROUP:
        case CLEAR_ALL:
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
            let newState = Object.assign({}, state, {
                devices: devices(state.devices, action)
            });
            newState.active = newState.devices.every(d => d.active) ? 1 : 0;
            return newState;
        case TOGGLE_GROUP:
            if (state.id !== action.groupId) {
                return state;
            }
            return Object.assign({}, state, {
                active : action.active,
                devices: devices(state.devices, action)
            });
        case CLEAR_ALL:
            return Object.assign({}, state, {
                active : 0,
                devices: devices(state.devices, action)
            });
        default:
            return state;
    }
};

export const groups = (state = [], action) => {
    switch (action.type) {
        case TOGGLE_DEVICE:
        case TOGGLE_GROUP:
        case CLEAR_ALL:
            return state.map(g => group(g, action));
        default:
            return state;
    }
};

const testToggleDevice = () => {
    const stateBefore = [{
        "id"     : "1",
        "name"   : "group 1",
        "active" : 1,
        "devices": [
            {
                "id"    : 11,
                "name"  : "device 11",
                "active": 1
            },
            {
                "id"    : 12,
                "name"  : "device 12",
                "active": 1
            }
        ]
        
    }];
    const action      = toggleDevice("1", 11);
    const stateAfter  = [{
        "id"     : "1",
        "name"   : "group 1",
        "active" : 0,
        "devices": [
            {
                "id"    : 11,
                "name"  : "device 11",
                "active": 0
            },
            {
                "id"    : 12,
                "name"  : "device 12",
                "active": 1
            }
        ]
        
    }];
    
    deepFreeze(stateBefore);
    deepFreeze(action);
    
    expect(groups(stateBefore, action)).toEqual(stateAfter);
};
const testToggleGroup  = () => {
    const stateBefore = [{
        "id"     : "1",
        "name"   : "group 1",
        "active" : 0,
        "devices": [{
            "id"    : 11,
            "name"  : "device 11",
            "active": 1
        }, {
            "id"    : 12,
            "name"  : "device 12",
            "active": 0
        }, {
            "id"    : 13,
            "name"  : "device 13",
            "active": 1
        }, {
            "id"    : 14,
            "name"  : "device 14",
            "active": 0
        }, {
            "id"    : 15,
            "name"  : "device 15",
            "active": 0
        }, {
            "id"    : 16,
            "name"  : "device 16",
            "active": 1
        }, {
            "id"    : 17,
            "name"  : "device 17",
            "active": 1
        }]
        
    }, {
        "id"     : "2",
        "name"   : "group 2",
        "active" : 1,
        "devices": [{
            "id"    : 21,
            "name"  : "device 21",
            "active": 1
        }, {
            "id"    : 22,
            "name"  : "device 22",
            "active": 1
        }, {
            "id"    : 23,
            "name"  : "device 23",
            "active": 1
        }, {
            "id"    : 24,
            "name"  : "device 24",
            "active": 1
        }, {
            "id"    : 25,
            "name"  : "device 25",
            "active": 1
        }, {
            "id"    : 26,
            "name"  : "device 26",
            "active": 1
        }, {
            "id"    : 27,
            "name"  : "device 27",
            "active": 1
        }]
        
    }];
    const action      = toggleGroup("2", 0);
    const stateAfter  = [{
        "id"     : "1",
        "name"   : "group 1",
        "active" : 0,
        "devices": [{
            "id"    : 11,
            "name"  : "device 11",
            "active": 1
        }, {
            "id"    : 12,
            "name"  : "device 12",
            "active": 0
        }, {
            "id"    : 13,
            "name"  : "device 13",
            "active": 1
        }, {
            "id"    : 14,
            "name"  : "device 14",
            "active": 0
        }, {
            "id"    : 15,
            "name"  : "device 15",
            "active": 0
        }, {
            "id"    : 16,
            "name"  : "device 16",
            "active": 1
        }, {
            "id"    : 17,
            "name"  : "device 17",
            "active": 1
        }]
        
    }, {
        "id"     : "2",
        "name"   : "group 2",
        "active" : 0,
        "devices": [{
            "id"    : 21,
            "name"  : "device 21",
            "active": 0
        }, {
            "id"    : 22,
            "name"  : "device 22",
            "active": 0
        }, {
            "id"    : 23,
            "name"  : "device 23",
            "active": 0
        }, {
            "id"    : 24,
            "name"  : "device 24",
            "active": 0
        }, {
            "id"    : 25,
            "name"  : "device 25",
            "active": 0
        }, {
            "id"    : 26,
            "name"  : "device 26",
            "active": 0
        }, {
            "id"    : 27,
            "name"  : "device 27",
            "active": 0
        }]
        
    }];
    
    deepFreeze(stateBefore);
    deepFreeze(action);
    
    expect(groups(stateBefore, action)).toEqual(stateAfter);
};
const testClearAll     = () => {
    const stateBefore = [{
        "id"     : "1",
        "name"   : "group 1",
        "active" : 1,
        "devices": [
            {
                "id"    : 11,
                "name"  : "device 11",
                "active": 1
            },
            {
                "id"    : 12,
                "name"  : "device 12",
                "active": 1
            }
        ]
        
    }];
    const action      = clearAll();
    const stateAfter  = [{
        "id"     : "1",
        "name"   : "group 1",
        "active" : 0,
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
testToggleGroup();
testClearAll();
console.debug("Device groups tests passed!");
