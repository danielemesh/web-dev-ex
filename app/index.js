require("./assets/styles/style.scss");

import { createStore, applyMiddleware } from "redux";
import createLogger from "redux-logger";

import $ from "jquery";

import { app } from "./reducers";
import {DATA} from "./data/ex_data";

const initialState = {
    groups: DATA.device_groups,
    times: DATA.times
};

const logger = createLogger();
const store  = createStore(app, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(logger));