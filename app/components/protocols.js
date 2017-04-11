import $ from "jquery";

import { renderSelectorsList } from './shared';

export const renderProtocolsBox = (protocols) => {
    let box = $(".protocols-box .box-content");
    
    const html = renderSelectorsList(protocols);
    
    box.html(html);
};

export const renderProtocolsSummary = (protocols) => {
    protocols = protocols.filter(p => p.active);
    
    const emptyClass = protocols.length ? "" : "empty";
    
    return `<div class="summary-section ${emptyClass}">
                    <h4 class="summary-section-header">
                        <span class="step">2</span>
                        <span class="placeholder">-Select Protocols-</span>
                    </h4>
                    <div class="summary-section-content">
                        ${!emptyClass ? renderProtocolsSummaryList(protocols) : ""}
                    </div>
                </div>`
};

const renderProtocolsSummaryList = (protocols) => {
    let listHtml = `<ul class="summary-list">`;
    
    const items = protocols.map(protocol => {
        return `<li class="summary-list-item">${protocol.name}</li>`;
    });
    
    return listHtml.concat(items.join("")).concat("</ul>");
    
};