require("./assets/styles/style.scss");

import { createStore, applyMiddleware } from "redux";
import { clearAll, selectTime, toggleDevice, toggleGroup, toggleProtocol } from "./actions";
import createLogger from "redux-logger";

import $ from "jquery";

import { app } from "./reducers/root_reducer";
import { DATA } from "./data/ex_data";

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

const renderDevicesGroupsBox = () => {
    let groups = store.getState().groups;
    
    let box = $(".group-devices-box .box-content");
    
    const accordionItems = groups.map(group => renderAccordionItems(group));
    
    const html = `<div class="accordion">${accordionItems.join("")}</div>`;
    
    box.html(html);
};

const renderAccordionItems = (group) => {
    let input = `<input type="checkbox" class="group-input"`;
    
    input += group.active ? " checked>" : ">";
    
    return `<div class="accordion-item" data-group-id="${group.id}">
                <div class="accordion-item-header">
                    <i class="accordion-toggler triangle"></i>
                    <label class="label">
                        ${input}
                        ${group.name}
                    </label>
                </div>
                <div class="accordion-item-content bordered">
                    ${renderSelectorsList(group.devices)}
                </div>
            </div>`;
};

const renderProtocolsBox = () => {
    const protocols = store.getState().protocols;
    let box         = $(".protocols-box .box-content");
    
    const html = renderSelectorsList(protocols);
    
    box.html(html);
};

const renderTimesBox = () => {
    const times = store.getState().times;
    let box     = $(".times-box .box-content");
    
    const html = renderSelectorsList(times);
    
    box.html(html);
};

const renderSelectorsList = (items) => {
    let itemsHtml = items.map(item => renderSelectorsListItem(item));
    
    return `<ul class="selectors-list">${itemsHtml.join("")}</ul>`;
};

const renderSelectorsListItem = (item) => {
    let input = `<input type="${item.inputType}" name="${item.inputName}" data-item-id="${item.id}"`;
    
    input += item.active ? " checked>" : ">";
    
    return `<li class="selector-item">
                <label class="label">
                    ${input}
                    ${item.name}
                </label>
            </li>`;
};

const renderSummaryBox = () => {
    let box = $(".summary-box .box-content");
    
    const groupsSummary     = renderGroupsSummary();
    const protocolsSummary  = renderProtocolsSummary();
    const timesSummary      = renderTimesSummary();
    const ctaButtonsSummary = renderCTAButtonsSummary();
    
    box.html(groupsSummary.concat(protocolsSummary).concat(timesSummary).concat(ctaButtonsSummary));
};

const renderGroupsSummary = () => {
    let groups       = getActiveDevicesGroups(store.getState().groups);
    const emptyClass = groups.length ? "" : "empty";
    
    return `<div class="summary-section ${emptyClass}">
                    <h4 class="summary-section-header">
                        <span class="step">1</span>
                        <span class="placeholder">-Select Devices-</span>
                    </h4>
                    <div class="summary-section-content">
                        ${renderGroupsSummaryLists(groups)}
                    </div>
                </div>`;
};

const getActiveDevicesGroups = (groups) => {
    let activeDevicesGroups = [];
    
    groups.forEach((group) => {
        let devices = group.devices.filter(d => d.active);
        
        if (devices.length) {
            activeDevicesGroups.push(group);
        }
    });
    
    return activeDevicesGroups;
};

const renderGroupsSummaryLists = (groups) => {
    let html = groups.map(group => {
        let activeDevices = group.devices.filter(d => d.active);
        
        if (activeDevices.length) {
            let listHtml = `<ul class="summary-list">`;
            
            const items = activeDevices.map((device) => {
                return `<li class="summary-list-item">${device.name}</li>`;
            });
            
            return listHtml.concat(items.join("")).concat("</ul>");
        }
    });
    
    return html.join("");
};

const renderProtocolsSummary = () => {
    let protocols = store.getState().protocols;
    protocols     = protocols.filter(p => p.active);
    
    const emptyClass = protocols.length ? "" : "empty";
    
    return `<div class="summary-section ${emptyClass}">
                    <h4 class="summary-section-header">
                        <span class="step">2</span>
                        <span class="placeholder">-Select Protocols-</span>
                    </h4>
                    <div class="summary-section-content">
                        ${renderProtocolsSummaryList(protocols)}
                    </div>
                </div>`
};

const renderProtocolsSummaryList = (protocols) => {
    if (protocols.length) {
        let listHtml = `<ul class="summary-list">`;
        
        const items = protocols.map(protocol => {
            return `<li class="summary-list-item">${protocol.name}</li>`;
        });
        
        return listHtml.concat(items.join("")).concat("</ul>");
    }
    return "";
};

const renderTimesSummary = () => {
    const times        = store.getState().times;
    const selectedTime = times.filter(t => t.active);
    const emptyClass   = selectedTime.length ? "" : "empty";
    
    return `<div class="summary-section ${emptyClass}">
                    <h4 class="summary-section-header">
                        <span class="step">3</span>
                        <span class="placeholder">-Select Time Period-</span>
                        <span class="value">${ selectedTime.length ? selectedTime[0].name : ""}</span>
                    </h4>
                </div>`;
};

const renderCTAButtonsSummary = () => {
    return `<div class="summary-section cta-buttons">
                    <a href="#" class="btn btn-link cta-btn" id="clearBtn">Clear</a>
                    <span class="btn btn-primary cta-btn">
                        <i class="triangle triangle-right"></i>
                        <input class="btn submit-btn" type="submit" id="submitBtn" value="Start Learning">
                    </span>
                </div>`;
};

const renderAll = () => {
    renderDevicesGroupsBox();
    renderProtocolsBox();
    renderTimesBox();
    renderSummaryBox();
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
    const active = element.is(":checked") ? 1 : 0;
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