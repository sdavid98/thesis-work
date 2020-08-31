const createBasicDraggable = (itemType, id) => {
    return {
        type: 'CREATEBASICDRAGGABLE',
        itemType: itemType,
        id: id
    };
};

const createButtonDraggable = (itemType, id) => {
    return {
        type: 'CREATEBUTTONDRAGGABLE',
        itemType: itemType,
        id: id
    };
};

const createSpacerDraggable = (itemType, id) => {
    return {
        type: 'CREATESPACERDRAGGABLE',
        itemType: itemType,
        id: id
    };
};

const createListDraggable = (itemType, id) => {
    return {
        type: 'CREATELISTDRAGGABLE',
        itemType: itemType,
        id: id
    };
};

const createImageDraggable = (itemType, id) => {
    return {
        type: 'CREATEIMAGEDRAGGABLE',
        itemType: itemType,
        id: id
    };
};

const resizeItem = (itemId, height) => {
    return {
        type: 'RESIZEITEM',
        itemId: itemId,
        height: height
    }
};

const changeItemContent = (itemId, text) => {
    return {
        type: 'CHANGECONTENT',
        itemId: itemId,
        text: text
    }
};

const addNewListItem = (itemId, newListItem) => {
    return {
        type: 'ADDNEWLISTITEM',
        itemId: itemId,
        newListItem: newListItem
    }
};

const changeListItems = (itemId, listItem) => {
    return {
        type: 'CHANGELISTITEMS',
        itemId: itemId,
        listItem: listItem
    }
};

const changeItemPadding = (itemId, style) => {
    return {
        type: 'CHANGEITEMPADDING',
        itemId: itemId,
        style: style
    }
};

const changeItemColor = (itemId, style) => {
    return {
        type: 'CHANGEITEMCOLOR',
        itemId: itemId,
        style: style
    }
};

const changeItemBackColor = (itemId, style) => {
    return {
        type: 'CHANGEITEMBACKCOLOR',
        itemId: itemId,
        style: style
    }
};

const changeItemFontSize = (itemId, style) => {
    return {
        type: 'CHANGEITEMFONTSIZE',
        itemId: itemId,
        style: style
    }
};

const changeItemLineHeight = (itemId, style) => {
    return {
        type: 'CHANGEITEMLINEHEIGHT',
        itemId: itemId,
        style: style
    }
};

const changeItemFontWeight = (itemId, style) => {
    return {
        type: 'CHANGEITEMFONTWEIGHT',
        itemId: itemId,
        style: style
    }
};

const changeItemFontStyle = (itemId, style) => {
    return {
        type: 'CHANGEITEMFONTSTYLE',
        itemId: itemId,
        style: style
    }
};

const changeItemTextDecoration = (itemId, style) => {
    return {
        type: 'CHANGEITEMTEXTDECORATION',
        itemId: itemId,
        style: style
    }
};

const changeItemTextDecorationColor = (itemId, style) => {
    return {
        type: 'CHANGEITEMTEXTDECORATIONCOLOR',
        itemId: itemId,
        style: style
    }
};

const changeItemTextAlign = (itemId, style) => {
    return {
        type: 'CHANGEITEMTEXTALIGN',
        itemId: itemId,
        style: style
    }
};

const changeItemBorder = (itemId, style) => {
    return {
        type: 'CHANGEITEMBORDER',
        itemId: itemId,
        style: style
    }
};

const changeLinkUnderlineDisplay = (itemId, display) => {
    return {
        type: 'CHANGELINKUNDERLINEDISPLAY',
        itemId: itemId,
        display: display
    }
};

const changeImageSourceUrl = (itemId, src) => {
    return {
        type: 'CHANGEIMAGESOURCEURL',
        itemId: itemId,
        src: src
    }
};

const changeImageAlt = (itemId, alt) => {
    return {
        type: 'CHANGEIMAGEALT',
        itemId: itemId,
        alt: alt
    }
};

const changeLink = (itemId, link) => {
    return {
        type: 'CHANGELINK',
        itemId: itemId,
        link: link
    }
};

const changeListSymbolType = (itemId, symbol) => {
    return {
        type: 'CHANGELISTSYMBOLTYPE',
        itemId: itemId,
        symbolType: symbol
    }
};

const changeListSymbolSign = (itemId, symbol) => {
    return {
        type: 'CHANGELISTSYMBOLSIGN',
        itemId: itemId,
        sign: symbol
    }
};

const changeListSymbolSrc = (itemId, symbol) => {
    return {
        type: 'CHANGELISTSYMBOLSRC',
        itemId: itemId,
        src: symbol
    }
};

const changeListSymbolTrailingChars = (itemId, chars) => {
    return {
        type: 'CHANGELISTSYMBOLTRAILING',
        itemId: itemId,
        chars: chars
    }
};

const changeListSymbolImageStyle = (itemId, style) => {
    return {
        type: 'CHANGELISTSYMBOLIMAGESTYLE',
        itemId: itemId,
        style: style
    }
};

const changeListSymbolVerticalAlign = (itemId, style) => {
    return {
        type: 'CHANGELISTSYMBOLVERTICALALIGN',
        itemId: itemId,
        style: style
    }
};

const changeListSymbolVerticalAlignAdjustment = (itemId, style) => {
    return {
        type: 'CHANGELISTSYMBOLVERTICALALIGNADJUSTMENT',
        itemId: itemId,
        style: style
    }
};

const changeListSymbolSize = (itemId, style) => {
    return {
        type: 'CHANGELISTSYMBOLSIZE',
        itemId: itemId,
        style: style
    }
};

const changeListItemsGap = (itemId, style) => {
    return {
        type: 'CHANGELISTITEMSGAP',
        itemId: itemId,
        style: style
    }
};

const changeListSymbolWidth = (itemId, style) => {
    return {
        type: 'CHANGELISTSYMBOLWIDTH',
        itemId: itemId,
        style: style
    }
};

const changeListInlineGap = (itemId, style) => {
    return {
        type: 'CHANGELISTITEMINLINEGAP',
        itemId: itemId,
        style: style
    }
};

const changeCanvasWidth = (style) => {
    return {
        type: 'CHANGECANVASWIDTH',
        style: style
    }
};

const changeCanvasBackColor = (style) => {
    return {
        type: 'CHANGECANVASBACKCOLOR',
        style: style
    }
};

const changeCanvasForeColor = (style) => {
    return {
        type: 'CHANGECANVAFORECOLOR',
        style: style
    }
};

const changeActiveItemId = itemId => {
    return {
        type: 'CHANGEACTIVEITEMID',
        itemId: itemId
    }
};

const removeDraggable = itemId => {
    return {
        type: 'REMOVEDRAGGABLE',
        id: itemId,
    }
};

const createStructure = (id, type, width) => {
    switch (type) {
        case 'custom':
            return {
                type: 'INITCUSTOM',
                id: id,
                width: width
            };
        case 1:
            return {
                type: 'INITCOL1',
                id: id,
                width: width
            };
        case 2:
            return {
                type: 'INITCOL2',
                id: id,
                width: width
            };
        case 3:
            return {
                type: 'INITCOL3',
                id: id,
                width: width
            };
        case 4:
            return {
                type: 'INITCOL4',
                id: id,
                width: width
            };
        default:
            return {
                type: 'INITCUSTOM',
                id: id,
                width: width
            };
    }
};

const changeActiveStructureId = id => {
    return {
        type: 'CHANGEACTIVEDATAID',
        id: id
    }
};

const addStructureColumn = ({indexChange, columns, rows, rowId, colIdArray}) => {
    return {
        type: 'ADDCOLUMN',
        columns: columns,
        indexChange: indexChange,
        rows: rows,
        rowId: rowId,
        colIdArray: colIdArray
    }
};

const deleteStructureSubItem = (deleteColumnIdsArray, deleteRowIdsArray) => {
    return {
        type: 'DELETESUBITEM',
        deleteColumnIdsArray: deleteColumnIdsArray,
        deleteRowIdsArray: deleteRowIdsArray
    }
};

const addStructureRow = (colId) => {
    return {
        type: 'ADDROW',
        colId: colId
    }
};

const changeColumnWidth = (colId, width) => {
    return {
        type: 'CHANGECOLUMNWIDTH',
        colId: colId,
        width: width
    }
};

const addContent = (rowId, contentId) => {
    return {
        type: 'ADDCONTENT',
        rowId: rowId,
        contentId: contentId
    }
};

const initRowStyle = (rowId) => {
    return {
        type: 'INITROWSTYLE',
        id: rowId,
    }
};

const changeRowBackColor = (id, value) => {
    return {
        type: 'CHANGEROWBACKCOLOR',
        id: id,
        value: value
    }
};

const changeRowAlign = (id, value) => {
    return {
        type: 'CHANGEROWALIGN',
        id: id,
        value: value
    }
};

const deleteRow = () => {
    return {
        type: 'DELETEROW',
    }
};

const toggleRegions = () => {
    return {
        type: 'SHOWREGIONS',
    }
};

const changeInnerHeight = (itemId, height) => {
    return {
        type: 'CHANGEINNERHEIGHT',
        itemId: itemId,
        height: height
    }
};

export {createBasicDraggable, createButtonDraggable, resizeItem, changeActiveItemId, changeItemContent, changeItemPadding,
    createListDraggable, createImageDraggable, addNewListItem, changeListItems, changeItemColor, changeItemBackColor,
    changeItemFontSize, changeItemLineHeight, changeItemFontWeight, changeItemFontStyle, changeItemTextDecoration,
    changeItemTextDecorationColor, changeItemTextAlign, changeItemBorder, changeLinkUnderlineDisplay,
    changeImageSourceUrl, changeImageAlt, changeLink, changeListSymbolType, changeListSymbolSign, changeListSymbolSrc,
    changeListSymbolTrailingChars, changeListSymbolImageStyle, changeListSymbolVerticalAlign,
    changeListSymbolVerticalAlignAdjustment, changeListSymbolSize, changeListInlineGap, changeListItemsGap,
    changeCanvasBackColor, changeCanvasForeColor, changeCanvasWidth, removeDraggable, createStructure, addStructureRow,
    addStructureColumn, changeActiveStructureId, deleteStructureSubItem, changeColumnWidth, addContent, initRowStyle,
    changeRowBackColor, deleteRow, toggleRegions, changeRowAlign, createSpacerDraggable, changeInnerHeight, changeListSymbolWidth};