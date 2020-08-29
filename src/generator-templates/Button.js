import {pushStyleOnElement, removeParentStyle, removeUnusedStyles} from "./styleHelpers";

const additionalStyles = {
    display: 'block'
};

const button = item => {
    const a = document.createElement('a');
    a.innerHTML = item.content.text;
    a.href = item.content.link;
    a.target = '_blank';
    if (!item.underlineLinksIfPresent) {
        a.style.textDecorationLine = 'none';
    }

    const children = [...a.childNodes];

    a.innerHTML = children.filter(node => node.tagName).map(node => {
        const span = document.createElement('span');
        span.innerHTML = node.innerHTML;

        const itemStyle = removeParentStyle(removeUnusedStyles({...item.rootElementStyle}));
        Object.keys(itemStyle).map(key => {
            span.style[key] = itemStyle[key];
        });

        return span.outerHTML;
    }).join('');

    return pushStyleOnElement(a, {...removeUnusedStyles({...item.rootElementStyle}), ...additionalStyles});
};

export default button;