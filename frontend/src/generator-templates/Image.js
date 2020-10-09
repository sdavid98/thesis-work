import {pushStyleOnElement, removeUnusedStyles, wrapContentWithBorder} from "./styleHelpers";

const image = (item, width) => {
    const hasBorder = item.rootElementStyle.border.split(' ')[0] !== 'none';
    const td = document.createElement('td');
    const img = document.createElement('img');
    img.src = item.content.imageSrc;
    img.alt = item.content.imageAlt;

    let reducedWidth = width;
    if (item.rootElementStyle.padding.split(' ').some(pad => pad !== '0px')) {
        reducedWidth -= (parseInt(item.rootElementStyle.padding.split(' ')[1]) + parseInt(item.rootElementStyle.padding.split(' ')[3]));
    }

    if (hasBorder) {
        reducedWidth -= parseInt(item.rootElementStyle.border.split(' ')[2]) * 2;
    }

    img.width = reducedWidth;
    img.style.width = reducedWidth;
    img.style.display = 'block';

    td.width = reducedWidth;
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

    if (hasBorder) {
        return wrapContentWithBorder({width: width, content: td.outerHTML}, {color: item.rootElementStyle.border.split(' ')[1], size: item.rootElementStyle.border.split(' ')[2]});
    }

    return td.outerHTML;
};

export default image;