export const renderSelectorsList = (items) => {
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