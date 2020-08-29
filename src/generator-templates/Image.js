import {expandShortHandPadding, removeParentStyle, removeUnusedStyles} from "./styleHelpers";

const additionalStyles = {
    display: 'block'
};

const image = (item, width) => {
    const img = document.createElement('img');
    img.src = item.content.imageSrc;
    img.alt = item.content.imageAlt;
    img.width = width;

    if (item.content.link) {
        const a = document.createElement('a');
        a.innerHTML = img.outerHTML;
        a.href = item.content.link;
        a.target = '_blank';

        if (!item.underlineLinksIfPresent) {
            a.style.textDecorationLine = 'none';
        }

        const itemStyle = {...removeUnusedStyles({...item.rootElementStyle}), ...additionalStyles};
        Object.keys(itemStyle).map(key => {
            a.style[key] = itemStyle[key];
        });

        const res = expandShortHandPadding(a.outerHTML.toString());

        console.log(res);

        return res;
    }

    const itemStyle = {...removeUnusedStyles({...item.rootElementStyle}), ...additionalStyles};
    Object.keys(itemStyle).map(key => {
        img.style[key] = itemStyle[key];
    });

    const res = expandShortHandPadding(img.outerHTML.toString());

    console.log(res);

    return res;
};

export default image;