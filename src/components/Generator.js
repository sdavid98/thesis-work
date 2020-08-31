import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import Text from '../generator-templates/Text';
import Button from '../generator-templates/Button';
import Image from '../generator-templates/Image';
import Spacer from '../generator-templates/Spacer';
import List from '../generator-templates/List';
import htmlHead from "../generator-templates/htmlHead";

//https://stackoverflow.com/questions/26360414/javascript-how-to-correct-indentation-in-html-string
function process(str) {
    var div = document.createElement('div');
    div.innerHTML = str.trim();

    return format(div, 0).innerHTML;
}

function format(node, level) {
    var indentBefore = new Array(level++ + 1).join('  '),
        indentAfter = new Array(level - 1).join('  '),
        textNode;

    for (var i = 0; i < node.children.length; i++) {
        textNode = document.createTextNode('\n' + indentBefore);
        node.insertBefore(textNode, node.children[i]);

        format(node.children[i], level);

        if (node.lastElementChild === node.children[i]) {
            textNode = document.createTextNode('\n' + indentAfter);
            node.appendChild(textNode);
        }
    }

    return node;
}
const generator = (structureData, contents, canvasStyle, rowStyles) => {
    const getInitRowStyle = (id) => {
        const rowStyle = rowStyles.find(row => row.id === id);
        return `align="${rowStyle.justifyContent}" ${rowStyle.backgroundColor.split(' ')[0] !== 'none' ? 'bgcolor="' + rowStyle.backgroundColor.split(' ')[1] +'"' : ''}`;
    };
    const create = (columns, rows, width, dataId, initStyle = false) => {
        let result = '';
        result += `<table width="${width}" ${initStyle ? getInitRowStyle(dataId) : ''} cellspacing='0' cellpadding='0' border='0'><tr>`;
        columns.map((col) => {
            result += `<td valign="${rowStyles.find(row => row.id === dataId).justifyContent}" width='${col.width}' valign='top'><table width='${col.width}' cellspacing='0' cellpadding='0' border='0'>`;
            col.rows.map(colRow => {
                return rows.filter(row => row.id === colRow).map((row, index) => {
                    result += `<tr><td width='${col.width}' valign='top'>`;
                    if (row.columns && row.columns.length > 0) {
                        result += create(structureData.find(data => data.id === dataId).columns.filter(col => row.columns.indexOf(col.id) >= 0), rows, col.width, dataId);
                    }
                    else {
                        const content = contents.find(con => con.id === row.content);
                        if (content.type === 'text') {
                            result += Text(content);
                        }
                        if (content.type === 'button') {
                            result += Button(content, col.width);
                        }
                        if (content.type === 'image') {
                            result += Image(content, col.width);
                        }
                        if (content.type === 'divider') {
                            result += Spacer(content);
                        }
                        if (content.type === 'list') {
                            result += List(content, col.width);
                        }
                    }
                    result += "</td></tr>";
                    return result;
                })
            });
            result += "</table></td>";
        });
        result += "</tr></table>";
        return result;
    };

    let resultTop = htmlHead;
    resultTop += `<body style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: ${canvasStyle.backColor};">`;
    let result = `<table style="table-layout: fixed; vertical-align: top; min-width: 320px; Margin: 0 auto; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: ${canvasStyle.backColor}; width: 100%;" cellpadding="0" cellspacing="0" role="presentation" width="100%" bgcolor="${canvasStyle.backColor}" valign="top">`;
    result += `<tr><td style="word-break: break-word; vertical-align: top; padding-top:20px;padding-bottom:20px;padding-right:0;padding-left:0" valign="top">`;
    result += `<table width="${parseInt(canvasStyle.width)}" align="center" cellpadding="0" cellspacing="0" border="0" style="background-color:${canvasStyle.foreColor};" bgcolor="${canvasStyle.foreColor}">`;

    result += structureData.map(
        data => create(data.columns.filter(col => col.level === 0), data.rows, parseInt(canvasStyle.width), data.id, true)
    ).map(table => `<tr><td>${table}</td></tr>`).join('');
    result += '</table></td></tr></table>';

    result = process(result);

    const resultBottom = '</body></html>';

    result = resultTop + result + resultBottom;

    const data = new Blob([result], {type: 'text/html'});
    let a = document.createElement('a');
    a.download = true;
    a.href = window.URL.createObjectURL(data);
    a.download = 'test.html';
    a.click();

    return false;
};

export default generator;