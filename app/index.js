require("./assets/styles/style.scss");

import { createStore, applyMiddleware } from "redux";
import createLogger from "redux-logger";

import $ from "jquery";

import { app } from "./reducers/root_reducer";
import { DATA } from "./data/ex_data";

const normalizeData = (data) => {
    let normalizedData = {
        groups   : data.device_groups,
        protocols: data.protocols.map(protocol => assignActiveProp(protocol)),
        times    : {
            byId        : constructById(data.times, "id"),
            selectedTime: 0
        }
    };
    
    return normalizedData;
};

const assignActiveProp = (obj) => {
    return Object.assign({}, obj, {
        active: 0
    });
};

const constructById = (dataArr, key) => {
    return dataArr.reduce((result, next) => {
        result[next[key]] = next;
        return result;
    }, {});
};

const initialState = normalizeData(DATA);

const logger = createLogger();
const store  = createStore(app, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(logger));