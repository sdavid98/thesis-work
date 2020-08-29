import {removeUnusedStyles} from "./styleHelpers";

const button = item => {
    const div = document.createElement('div');
    div.innerHTML = item.content.text;

    const children = [...div.childNodes];

    const styledNodes = children.map(node => {
        const itemStyle = removeUnusedStyles({...item.rootElementStyle});
        Object.keys(itemStyle).map(key => {
            node.style[key] = itemStyle[key];
        });

        return node.outerHTML;
    });

    return div.innerHTML;
};

export default button;