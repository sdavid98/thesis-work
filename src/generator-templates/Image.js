import {pushStyleOnElement, removeUnusedStyles} from "./styleHelpers";

const image = (item, width) => {
    const img = document.createElement('img');
    img.src = item.content.imageSrc;
    img.alt = item.content.imageAlt;

    let reducedWidthByPadding = width;
    if (item.rootElementStyle.padding.split(' ').some(pad => pad !== '0px')) {
        reducedWidthByPadding -= (parseInt(item.rootElementStyle.padding.split(' ')[1]) + parseInt(item.rootElementStyle.padding.split(' ')[3]));
    }

    img.width = reducedWidthByPadding;
    img.style.width = reducedWidthByPadding;

    if (item.content.link) {
        const a = document.createElement('a');
        a.innerHTML = img.outerHTML;
        a.href = item.content.link;
        a.target = '_blank';

        if (!item.underlineLinksIfPresent) {
            a.style.textDecorationLine = 'none';
        }

        return pushStyleOnElement(a, {...removeUnusedStyles({...item.rootElementStyle}), display: 'block'});
    }
    return pushStyleOnElement(img, removeUnusedStyles({...item.rootElementStyle}));
};

export default image;