require("./assets/styles/style.scss");

import { createStore, applyMiddleware } from "redux";
import createLogger from "redux-logger";
import $ from "jquery";

import { clearAll, selectTime, toggleDevice, toggleGroup, toggleProtocol } from "./actions/actions";
import { app } from "./reducers/root_reducer";
import { DATA } from "./data/ex_data";

import { renderDevicesGroupsBox } from './components/groups';
import { renderProtocolsBox } from "./components/protocols";
import { renderTimesBox } from './components/times';
import { renderSummaryBox } from "./components/summary";


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

const getParentGroupId = (element) => {
    return element.parents(".accordion-item").data("group-id").toString();
};

const getElementItemId = (element) => {
    return element.data("item-id");
};

const getActiveItemsIds = (items) => {
    return items.reduce((result, next) => {
        if (next.active) {
            result.push(next.id);
        }
        return result;
    }, []);
};

/* Event Handlers
 ============================= */
form.on("click", "#clearBtn", e => {
    e.preventDefault();
    
    store.dispatch(clearAll());
});

form.on("change", ".accordion-item-content input", e => {
    e.preventDefault();
    const element       = $(e.target);
    const deviceId      = element.data("item-id");
    const parentGroupId = getParentGroupId(element);
    
    store.dispatch(toggleDevice(parentGroupId, deviceId));
});

form.on("change", ".group-input", e => {
    const element       = $(e.target);
    const parentGroupId = getParentGroupId(element);
    const active        = element.is(":checked") ? 1 : 0;
    
    store.dispatch(toggleGroup(parentGroupId, active))
});

form.on("change", ".protocols-box input", e => {
    const id = getElementItemId($(e.target));
    store.dispatch(toggleProtocol(id))
});

form.on("change", ".times-box input", e => {
    const id = getElementItemId($(e.target));
    store.dispatch(selectTime(id))
});

form.on("click", "#submitBtn", e => {
    e.preventDefault();
    
    let devices = [];
    
    store.getState().groups.forEach(group => {
        devices = [
            ...devices,
            ...getActiveItemsIds(group.devices)
        ];
    });
    
    let protocols = getActiveItemsIds(store.getState().protocols);
    let times     = getActiveItemsIds(store.getState().times);
    
    const url = `?devices=${devices}&protocols=${protocols}&times=${times}`;
    
    window.history.pushState({}, "", encodeURI(url));
});

form.on("click", ".accordion-toggler", e => {
    let element = $(e.target);
    element.parents(".accordion-item").find(".accordion-item-content").slideToggle();
    element.toggleClass("triangle-up");
});