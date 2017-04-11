export const TOGGLE_DEVICE   = "TOGGLE_DEVICE";
export const TOGGLE_GROUP    = "TOGGLE_GROUP";
export const TOGGLE_PROTOCOL = "TOGGLE_PROTOCOL";
export const SELECT_TIME     = "SELECT_TIME";
export const CLEAR_ALL       = "CLEAR_ALL";

/* Actions Creators
 ============================= */
export const toggleDevice = (groupId, deviceId) => {
    return {
        type: TOGGLE_DEVICE,
        groupId,
        deviceId
    };
};

export const toggleGroup = (groupId, active) => {
    return {
        type: TOGGLE_GROUP,
        groupId,
        active
    };
};

export const selectTime = (id) => {
    return {
        type: SELECT_TIME,
        id
    };
};

export const toggleProtocol = (id) => {
    return {
        type: TOGGLE_PROTOCOL,
        id
    };
};

export const clearAll = () => {
    return {
        type: CLEAR_ALL
    };
};