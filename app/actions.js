export const TOGGLE_DEVICE = "TOGGLE_DEVICE";
export const SELECT_TIME = "SELECT_TIME";

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