const removeUnusedStyles = (styleObj) => {
    if (styleObj.padding && styleObj.padding.split(' ').every(padding => padding === '0px')) {
        delete styleObj.padding;
    }
    if (styleObj.backgroundColor.split(' ')[0] === 'none') {
        delete styleObj.backgroundColor;
    }
    else {
        styleObj.backgroundColor = styleObj.backgroundColor.split(' ')[1];
    }
    if (styleObj.fontWeight === 'normal') {
        delete styleObj.fontWeight;
    }
    if (styleObj.fontStyle === 'normal') {
        delete styleObj.fontStyle;
    }
    if (styleObj.textDecorationLine === 'none') {
        delete styleObj.textDecorationLine;
        delete styleObj.textDecorationColor;
    }
    if (styleObj.border) {
        delete styleObj.border;
    }
    if (styleObj.borderRadius === '0px') {
        delete styleObj.borderRadius;
    }
    if (styleObj.alignItems) {
        delete styleObj.alignItems;
    }
    if (styleObj.justifyContent) {
        delete styleObj.justifyContent;
    }
    if (styleObj.innerHeight) {
        delete styleObj.innerHeight;
    }

    return styleObj;
};

const removeParentStyle = (styleObj) => {
    ['padding', 'paddingTop', 'paddingLeft', 'paddingBottom', 'paddingRight', 'border', 'borderRadius', 'backgroundColor',
        'display', 'alignItems', 'justifyContent', 'height'].map(style => {
        if (styleObj[style]) {
            delete styleObj[style];
        }
    });

    return styleObj;
};

const generatePaddingCSSText = padding => {
    padding = padding.split(' ').slice(1);
    switch (padding.length) {
        case 1:
            padding = [padding[0], padding[0], padding[0], padding[0]];
            break;
        case 2:
            padding = [padding[0], padding[1], padding[0], padding[1]];
            break;
        case 3:
            padding = [padding[0], padding[1], padding[2], padding[1]];
            break;
        default: break;
    }

    return `padding-top: ${padding[0]}; padding-right: ${padding[1]}; padding-bottom: ${padding[2]}; padding-left: ${padding[3]};`
};

const expandShortHandPadding = str => {
    const start = str.search(/padding:/);
    const end = str.indexOf(';', start);
    const pad = str.substr(start, end - start);
    return str.replace(/padding:\s((\d*px\s?){1,4});/, generatePaddingCSSText(pad));
};

const pushStyleOnElement = (elem, styleObj) => {
    Object.keys(styleObj).map(key => {
        elem.style[key] = styleObj[key];
    });
    return expandShortHandPadding(elem.outerHTML.toString());
};

const wrapContentWithBorder = (item, border) => {
    const {size, color} = border;
    const {content, width} = item;
    console.log(item, border);
    return (
        `<table width="${width}" cellspacing='0' cellpadding='0' border='0'>
            <tr>
                <td colspan="3" width="${width}" height="${parseInt(size)}" bgcolor="${color}" style="width: ${width}; background-color: ${color}"></td>
            </tr>
            <tr>
                <td width="${parseInt(size)}" bgcolor="${color}" style="width: ${size}; background-color: ${color}"></td>
                ${content}
                <td width="${parseInt(size)}" bgcolor="${color}" style="width: ${size}; background-color: ${color}"></td>
            </tr>
            <tr>
                <td colspan="3" width="${width}" height="${parseInt(size)}" bgcolor="${color}" style="width: ${width}; background-color: ${color}"></td>
            </tr>
        </table>`
    );
};

export {removeUnusedStyles, removeParentStyle, pushStyleOnElement, wrapContentWithBorder};