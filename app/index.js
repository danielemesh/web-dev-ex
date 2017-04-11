require("./assets/styles/style.scss");

import { createStore, applyMiddleware } from "redux";
import { renderSummaryBox } from "./components/summary";
import createLogger from "redux-logger";
import $ from "jquery";

import { clearAll, selectTime, toggleDevice, toggleGroup, toggleProtocol } from "./actions/actions";
import { app } from "./reducers/root_reducer";
import { DATA } from "./data/ex_data";

import { renderDevicesGroupsBox } from './components/groups';
import { renderProtocolsBox } from "./components/protocols";
import { renderTimesBox } from './components/times';


const normalizeData = (data) => {
    // Groups
    let groups = data.device_groups;
    groups.map(group => {
        return group.devices.map(device => {
            return Object.assign(device, {
                inputType: "checkbox",
                inputName: device.name.replace(" ", "_")
            });
        });
    });
    
    groups = groups.map(group => {
        return Object.assign({}, group, {
            active: group.devices.every(d => d.active) ? 1 : 0
        });
    });
    
    // Protocols
    let protocols = data.protocols.map(protocol => {
        return Object.assign(protocol, {
            active   : 0,
            inputType: "checkbox",
            inputName: protocol.name.replace(" ", "_")
        });
    });
    
    // Times
    let times = data.times.map(time => {
        return Object.assign(time, {
            active   : 0,
            inputType: "radio",
            inputName: "time"
        });
    });
    
    return { groups, protocols, times };
};

const initialState = normalizeData(DATA);
const logger       = createLogger();
const store        = createStore(app, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(logger));


/* UI Code
 ============================= */


const renderAll = () => {
    renderDevicesGroupsBox(store.getState().groups);
    renderProtocolsBox(store.getState().protocols);
    renderTimesBox(store.getState().times);
    renderSummaryBox(store.getState());
};

store.subscribe(renderAll);
renderAll();

let form = $(".form");

/* Event Handlers
 ============================= */
form.on("click", "#clearBtn", event => {
    event.preventDefault();
    
    store.dispatch(clearAll());
});

form.on("change", ".accordion-item-content input", e => {
    e.preventDefault();
    const element       = $(e.target);
    const deviceId      = element.data("item-id");
    const parentGroupId = element.parents(".accordion-item").data("group-id").toString();
    
    store.dispatch(toggleDevice(parentGroupId, deviceId));
});

form.on("change", ".group-input", e => {
    const element       = $(e.target);
    const parentGroupId = element.parents(".accordion-item").data("group-id").toString();
    const active        = element.is(":checked") ? 1 : 0;
    store.dispatch(toggleGroup(parentGroupId, active))
});

form.on("change", ".protocols-box input", e => {
    const protocolId = $(e.target).data("item-id");
    store.dispatch(toggleProtocol(protocolId))
});

form.on("click", ".accordion-toggler", e => {
    $(e.target).parents(".accordion-item").find(".accordion-item-content").slideToggle();
});

form.on("change", ".times-box input", e => {
    const id = $(e.target).data("item-id");
    store.dispatch(selectTime(id))
});