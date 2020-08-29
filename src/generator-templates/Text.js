import {pushStyleOnElement, removeParentStyle, removeUnusedStyles} from "./styleHelpers";

const text = item => {
    const div = document.createElement('div');
    div.innerHTML = item.content.text;

    const children = [...div.childNodes];

    div.innerHTML = children.filter(node => node.tagName).map(node => {
        const itemStyle = removeParentStyle(removeUnusedStyles({...item.rootElementStyle}));
        Object.keys(itemStyle).map(key => {
            node.style[key] = itemStyle[key];
        });

        const links = Array.from(node.getElementsByTagName('a'));
        if (links.length > 0 && !item.underlineLinksIfPresent) {
            links.forEach(link => link.style.textDecorationLine = 'none');
        }

        return node.outerHTML;
    }).join('');

    return pushStyleOnElement(div, removeUnusedStyles({...item.rootElementStyle}));
};

export default text;