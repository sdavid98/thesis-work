import {pushStyleOnElement, removeUnusedStyles} from "./styleHelpers";

const spacer = (item, width, height) => {
    const td = document.createElement('td');
    td.height = height;
    td.width = width;
    td.vAlign = 'top';

    return pushStyleOnElement(td, removeUnusedStyles({...item.rootElementStyle}));
};

export default spacer;