import $ from "jquery";

import { renderSelectorsList } from './shared';

export const renderDevicesGroupsBox = (groups) => {
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

/* Summary
 ============================= */
export const renderGroupsSummary = (groups) => {
    let activeGroups = getActiveDevicesGroups(groups);
    const emptyClass = activeGroups.length ? "" : "empty";
    
    return `<div class="summary-section ${emptyClass}">
                    <h4 class="summary-section-header">
                        <span class="step">1</span>
                        <span class="placeholder">-Select Devices-</span>
                    </h4>
                    <div class="summary-section-content">
                        ${renderGroupsSummaryLists(activeGroups)}
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