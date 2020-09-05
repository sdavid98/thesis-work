import {pushStyleOnElement, removeUnusedStyles} from "./styleHelpers";

const text = (item, width) => {
    const td = document.createElement('td');
    td.innerHTML = item.content.text;
    td.width = width;
    td.vAlign = 'top';

    const children = [...td.childNodes];

    td.innerHTML = children.filter(node => node.tagName).map(node => node.innerHTML).join('<br>');

    return pushStyleOnElement(td, {...removeUnusedStyles({...item.rootElementStyle}), fontFamily: 'Roboto, Helvetica, Arial, sans-serif'});
};

export default text;