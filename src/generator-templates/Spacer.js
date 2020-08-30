import {pushStyleOnElement, removeUnusedStyles} from "./styleHelpers";

const spacer = (item) => {
    const div = document.createElement('div');
    div.innerHTML = '&nbsp;';

    return pushStyleOnElement(div, removeUnusedStyles({...item.rootElementStyle}));
};

export default spacer;