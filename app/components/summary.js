import $ from "jquery";

import { renderGroupsSummary } from "./groups";
import { renderProtocolsSummary } from "./protocols";
import { renderTimesSummary } from "./times";

export const renderSummaryBox = (state) => {
    let box = $(".summary-box .box-content");
    
    const html = renderGroupsSummary(state.groups).concat(
        renderProtocolsSummary(state.protocols),
        renderTimesSummary(state.times),
        renderCTAButtonsSummary());
    
    box.html(html);
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