import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import Text from '../generator-templates/Text';
import Button from '../generator-templates/Button';
import Image from '../generator-templates/Image';
import Spacer from '../generator-templates/Spacer';
import List from '../generator-templates/List';

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
const generator = (structureData, contents, rootWidth, rowStyles) => {
    const getInitRowStyle = (id) => {
        const rowStyle = rowStyles.find(row => row.id === id);
        return `align="${rowStyle.justifyContent}" ${rowStyle.backgroundColor.split(' ')[0] !== 'none' ? 'bgcolor="' + rowStyle.backgroundColor.split(' ')[1] +'"' : ''}`;
    };
    const create = (columns, rows, width, dataId, initStyle = false) => {
        let result = '';
        result += `<table width="${width}" ${initStyle ? getInitRowStyle(dataId) : ''} cellspacing='0' cellpadding='0' border='0'><tr>`;
        columns.map((col) => {
            result += `<td width='${col.width}' valign='top'><table width='${col.width}' cellspacing='0' cellpadding='0' border='0'>`;
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

    const result = structureData.map(
        data => create(data.columns.filter(col => col.level === 0), data.rows, parseInt(rootWidth), data.id, true)
    ).join('');
    const data = new Blob([process(result)], {type: 'text/html'});
    let a = document.createElement('a');
    a.download = true;
    a.href = window.URL.createObjectURL(data);
    a.download = 'test.html';
    a.click();

    return false;
};

export default generator;