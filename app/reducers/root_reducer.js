import { combineReducers } from "redux";

import { groups } from "./device_groups";
import { protocols } from "./protocols";
import { times } from "./times";


export const app = combineReducers({
    groups,
    times,
    protocols
});