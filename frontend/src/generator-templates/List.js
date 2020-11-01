import {pushStyleOnElement, removeParentStyle, removeUnusedStyles} from "./styleHelpers";
import {getListSign, getTrailingCharacters} from "../components/List";

const getListItemVerticalAlign = (item) => {
    if (item.content.listSymbol.style.listSymbolVerticalAlign === 'start') {
        return 'top';
    }
    if (item.content.listSymbol.style.listSymbolVerticalAlign === 'center') {
        return 'middle';
    }

    return 'bottom';
};

const generateListItemStyle = (item) => (
    `font-size: ${item.content.listSymbol.style.symbolSize}; mso-line-height-rule: exactly; line-height: 1.2; color: ${item.rootElementStyle.color}; vertical-align: ${getListItemVerticalAlign(item)};
    font-weight: ${item.rootElementStyle.fontWeight}; font-style: ${item.rootElementStyle.fontStyle}; text-decoration-line: ${item.rootElementStyle.textDecorationLine}; 
    text-decoration-color: ${item.rootElementStyle.textDecorationColor}; font-family: Roboto, Helvetica, Arial, sans-serif;
    ${item.content.listSymbol.style.listSymbolPaddingTop !== '0px' ? 'padding-top:' +item.content.listSymbol.style.listSymbolPaddingTop+';'  : ''}`
);

const getStyledListItemText = (item, content) => {
    const outerDiv = document.createElement('div');
    outerDiv.innerHTML = content;

    const children = [...outerDiv.childNodes];

    return children.filter(node => node.tagName).map(node => {
        const itemStyle = removeParentStyle(removeUnusedStyles({...item.rootElementStyle}));
        node.style.fontFamily = 'Roboto, Helvetica, Arial, sans-serif';
        node.style.margin = '0';
        Object.keys(itemStyle).forEach(key => {
            node.style[key] = itemStyle[key];
        });

        return node.outerHTML;
    }).join('');
};

const list = (item, width) => {
    let reducedWidthByPadding = width;
    if (item.rootElementStyle.padding.split(' ').some(pad => pad !== '0px')) {
        reducedWidthByPadding -= (parseInt(item.rootElementStyle.padding.split(' ')[1]) + parseInt(item.rootElementStyle.padding.split(' ')[3]));
    }

    let result = `<table width="${reducedWidthByPadding}" cellspacing="0" cellpadding="0" border="0" ${item.rootElementStyle.backgroundColor.split(' ')[0] !== 'none' ? 'bgcolor="'+item.rootElementStyle.backgroundColor.split(' ')[1]+'"' : ''}>`;
    item.content.text.forEach((listItem, index) => {
        result += '<tr>';
        result += `<td width="${item.content.listSymbol.style.width}" valign="${getListItemVerticalAlign(item)}" style="${generateListItemStyle(item)} width:${item.content.listSymbol.style.width}px">${getListSign(index, item)}${getTrailingCharacters(item)}</td>`;
        result += `<td width="${parseInt(item.content.listSymbol.style.inlineGap)}"></td>`;
        const remainingWidth = reducedWidthByPadding - Math.ceil(item.content.listSymbol.style.width) - parseInt(item.content.listSymbol.style.inlineGap);
        result += `<td width="${remainingWidth}" valign="${getListItemVerticalAlign(item)}" style="width:${remainingWidth}px; vertical-align: ${getListItemVerticalAlign(item)}">${getStyledListItemText(item, listItem)}</td>`;
        result += '</tr>';

        if (index !== item.content.text.length - 1 && item.content.listSymbol.style.listItemGap !== '0px') {
            result += `<tr><td colspan="3" height="${parseInt(item.content.listSymbol.style.listItemGap)}" style="height: ${item.content.listSymbol.style.listItemGap}; font-size: 1px; line-height: 1px;">&nbsp;</td></tr>`
        }
    });
    result += '</table>';

    const td = document.createElement('td');
    td.innerHTML = result;
    td.width = width;
    td.vAlign = 'top';

    return pushStyleOnElement(td, removeUnusedStyles({...item.rootElementStyle}));
};

export default list;