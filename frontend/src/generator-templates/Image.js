import {pushStyleOnElement, removeUnusedStyles} from "./styleHelpers";

const image = (item, width) => {
    const td = document.createElement('td');
    const img = document.createElement('img');
    img.src = item.content.imageSrc;
    img.alt = item.content.imageAlt;

    let reducedWidthByPadding = width;
    if (item.rootElementStyle.padding.split(' ').some(pad => pad !== '0px')) {
        reducedWidthByPadding -= (parseInt(item.rootElementStyle.padding.split(' ')[1]) + parseInt(item.rootElementStyle.padding.split(' ')[3]));
    }

    img.width = reducedWidthByPadding;
    img.style.width = reducedWidthByPadding;
    img.style.display = 'block';

    td.width = reducedWidthByPadding;
    td.vAlign = 'top';

    if (item.content.link) {
        const a = document.createElement('a');
        a.innerHTML = img.outerHTML;
        a.href = item.content.link;
        a.target = '_blank';

        if (!item.underlineLinksIfPresent) {
            a.style.textDecorationLine = 'none';
        }

        td.innerHTML = pushStyleOnElement(a, {...removeUnusedStyles({...item.rootElementStyle}), display: 'block'});
    }
    td.innerHTML = pushStyleOnElement(img, removeUnusedStyles({...item.rootElementStyle}));

    return td.outerHTML;
};

export default image;