import {pushStyleOnElement, removeUnusedStyles} from "../utils/style";

const spacer = (item, width, height) => {
    const td = document.createElement('td');
    td.height = height;
    td.width = width;
    td.vAlign = 'top';

    return pushStyleOnElement(td, removeUnusedStyles({...item.rootElementStyle}));
};

export default spacer;