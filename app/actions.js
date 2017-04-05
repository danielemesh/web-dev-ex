export const TOGGLE_DEVICE   = "TOGGLE_DEVICE";
export const TOGGLE_PROTOCOL = "TOGGLE_PROTOCOL";
export const SELECT_TIME     = "SELECT_TIME";

/* Actions Creators
 ============================= */
export const toggleDevice = (groupId, deviceId) => {
    return {
        type: TOGGLE_DEVICE,
        groupId,
        deviceId
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