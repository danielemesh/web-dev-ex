import $ from "jquery";

import { renderSelectorsList } from './shared';


export const renderTimesBox = (times) => {
    
    let box = $(".times-box .box-content");
    
    const html = renderSelectorsList(times);
    
    box.html(html);
};

export const renderTimesSummary = (times) => {
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