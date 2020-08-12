const createBasicDraggable = (itemType, id, y) => {
    return {
        type: 'CREATEBASICDRAGGABLE',
        itemType: itemType,
        id: id,
        y: y
    };
};

const createListDraggable = (itemType, id, y) => {
    return {
        type: 'CREATELISTDRAGGABLE',
        itemType: itemType,
        id: id,
        y: y
    };
};

const createImageDraggable = (itemType, id, y) => {
    return {
        type: 'CREATEIMAGEDRAGGABLE',
        itemType: itemType,
        id: id,
        y: y
    };
};

const moveItem = (itemId, position) => {
    return {
        type: 'MOVEITEM',
        itemId: itemId,
        newPosition: position
    }
};

const resizeItem = (itemId, itemData) => {
    return {
        type: 'RESIZEITEM',
        itemId: itemId,
        width: itemData.width,
        height: itemData.height
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

const changeImageDimensions = (itemId, dimensions) => {
    return {
        type: 'CHANGEIMAGEDIMENSIONS',
        itemId: itemId,
        width: dimensions.width,
        height: dimensions.height
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

const changeCanvasHeight = (style) => {
    return {
        type: 'CHANGECANVASHEIGHT',
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

const changeCanvasBorder = (style) => {
    return {
        type: 'CHANGECANVASBORDER',
        style: style
    }
};

const changeActiveItemId = itemId => {
    return {
        type: 'CHANGEACTIVEITEMID',
        itemId: itemId
    }
};

const makeDragHeightReCalculate = bool => {
    return {
        type: 'MAKEDRAGHEIGHTRECALCULATE',
        makeReCalculation: bool
    }
};

const makeCanvasDimensionsReCalculate = bool => {
    return {
        type: 'MAKECANVASDIMENSIONSRECALCULATE',
        makeReCalculation: bool
    }
};

const changeImageInitialLoadBool = (itemId, bool) => {
    return {
        type: 'CHANGEIMAGEINITIALLOADBOOL',
        itemId: itemId,
        bool: bool
    }
};

const removeDraggable = itemId => {
    return {
        type: 'REMOVEDRAGGABLE',
        id: itemId,
    }
};

const createStructure = id => {
    return {
        type: 'INIT',
        id: id
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

export {createBasicDraggable, moveItem, resizeItem, changeActiveItemId, changeItemContent, changeItemPadding,
    createListDraggable, createImageDraggable, addNewListItem, changeListItems, makeDragHeightReCalculate,
    changeItemColor, changeItemBackColor, changeItemFontSize, changeItemLineHeight, changeItemFontWeight,
    changeItemFontStyle, changeItemTextDecoration, changeItemTextDecorationColor, changeItemTextAlign, changeItemBorder,
    changeLinkUnderlineDisplay, changeImageInitialLoadBool, changeImageSourceUrl, changeImageDimensions, changeImageAlt,
    changeLink, changeListSymbolType, changeListSymbolSign, changeListSymbolSrc, changeListSymbolTrailingChars,
    changeListSymbolImageStyle, changeListSymbolVerticalAlign, changeListSymbolVerticalAlignAdjustment,
    changeListSymbolSize, changeListInlineGap, changeListItemsGap, changeCanvasBackColor, changeCanvasBorder,
    changeCanvasForeColor, changeCanvasHeight, changeCanvasWidth, makeCanvasDimensionsReCalculate, removeDraggable,
    createStructure, addStructureRow, addStructureColumn, changeActiveStructureId, deleteStructureSubItem,
    changeColumnWidth};