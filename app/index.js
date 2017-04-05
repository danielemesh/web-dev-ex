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


/* UI Code
 ============================= */
const form = $(".form");

//const renderBoxStructure = (cssClass, step, title) => {
//    return `<div class="box ${cssClass}">
//            <h3 class="box-title">
//                <span class="step">${step}</span>
//                ${title}
//            </h3>
//
//            <div class="box-content">
//
//            </div>
//        </div>`
//};

const renderDevicesGroupsBox = () => {
    const groups = store.getState().groups;
    
    let box = $(".group-devices-box .box-content");
    
    const accordionItems = groups.map(group => renderAccordionItems(group));
    
    const html = `<div class="accordion">${accordionItems.join("")}</div>`;
    
    box.html(html);
};

const renderAccordionItems = (group) => {
    return `<div class="accordion-item">
                <div class="accordion-item-header">
                    <i class="triangle"></i>
                    <label class="label">
                        <input type="checkbox">
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
    
    let box = $(".protocols-box .box-content");
    
    const html = renderSelectorsList(protocols);
    
    box.html(html);
};

const renderTimesBox = () => {
    let box = $(".times-box .box-content");
    
    let html = `<ul class="selectors-list">
                    <li class="selector-item">
                        <label class="label">
                            <input type="radio" name="time">
                            device 11
                        </label>
                    </li>
                    <li class="selector-item">
                        <label class="label">
                            <input type="radio" name="time">
                            device 11
                        </label>
                    </li>
                    <li class="selector-item">
                        <label class="label">
                            <input type="radio" name="time">
                            device 11
                        </label>
                    </li>
                </ul>`;
    
    box.html(html);
};

const renderSelectorsList = (items) => {
    let itemsHtml = items.map(item => renderSelectorsListItem(item));
    
    return `<ul class="selectors-list">${itemsHtml.join("")}</ul>`;
};

const renderSelectorsListItem = (item) => {
    let input = `<input type="checkbox">`;
    
    if (item.active) {
        input = `<input type="checkbox" checked>`;
    }
    
    return `<li class="selector-item">
                <label class="label">
                    ${input}
                    ${item.name}
                </label>
            </li>`;
};

renderDevicesGroupsBox();
renderProtocolsBox();
renderTimesBox();