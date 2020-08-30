import {pushStyleOnElement, removeParentStyle, removeUnusedStyles} from "./styleHelpers";
import React from "react";
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
    `font-size: ${item.content.listSymbol.style.symbolSize}; color: ${item.rootElementStyle.color}; line-height: 1; vertical-align: ${getListItemVerticalAlign(item)};
    font-weight: ${item.rootElementStyle.fontWeight}; font-style: ${item.rootElementStyle.fontStyle}; text-decoration-line: ${item.rootElementStyle.textDecorationLine}; 
    text-decoration-color: ${item.rootElementStyle.textDecorationColor}; fontFamily: 'Roboto, Helvetica, Arial, sans-serif';
    ${item.content.listSymbol.style.listSymbolPaddingTop !== '0px' ? 'padding-top:' +item.content.listSymbol.style.listSymbolPaddingTop  : ''}`
);

const getStyledListItemText = (item, content) => {
    const outerDiv = document.createElement('div');
    outerDiv.innerHTML = content;

    const children = [...outerDiv.childNodes];

    return children.filter(node => node.tagName).map(node => {
        const itemStyle = removeParentStyle(removeUnusedStyles({...item.rootElementStyle}));
        node.style.fontFamily = 'Roboto, Helvetica, Arial, sans-serif';
        node.style.margin = '0';
        Object.keys(itemStyle).map(key => {
            node.style[key] = itemStyle[key];
        });

        const links = Array.from(node.getElementsByTagName('a'));
        if (links.length > 0 && !item.underlineLinksIfPresent) {
            links.forEach(link => link.style.textDecorationLine = 'none');
        }

        return node.outerHTML;
    }).join('');
};

const list = (item, width) => {
    let result = `<table width="${width}" cellspacing="0" cellpadding="0" border="0" ${item.rootElementStyle.backgroundColor .split(' ')[0] !== 'none' ? 'bgcolor="'+item.rootElementStyle.backgroundColor.split(' ')[1]+'"' : ''}>`;
    item.content.text.map((listItem, index) => {
        result += '<tr>';
        result += `<td valign="${getListItemVerticalAlign(item)}" style="${generateListItemStyle(item)}">${getListSign(index, item)}${getTrailingCharacters(item)}</td>`;
        result += `<td width="${item.content.listSymbol.style.inlineGap}">&nbsp;</td>`;
        result += `<td valign="top">${getStyledListItemText(item, listItem)}</td>`;
        result += '</tr>';

        if (index !== item.content.text.length - 1 && item.content.listSymbol.style.listItemGap !== '0px') {
            result += `<tr><td colspan="3" height="${item.content.listSymbol.style.listItemGap}" style="height: ${item.content.listSymbol.style.listItemGap}; font-size: 1px; line-height: 1px;">&nbsp;</td></tr>`
        }
    });
    result += '</table>';

    const div = document.createElement('div');
    div.innerHTML = result;

    return pushStyleOnElement(div, removeUnusedStyles({...item.rootElementStyle}));
};

export default list;