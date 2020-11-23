export const createBasicDraggable = (itemType, id) => {
    return {
        type: 'CREATEBASICDRAGGABLE',
        itemType: itemType,
        id: id
    };
};

export const createButtonDraggable = (itemType, id) => {
    return {
        type: 'CREATEBUTTONDRAGGABLE',
        itemType: itemType,
        id: id
    };
};

export const createSpacerDraggable = (itemType, id) => {
    return {
        type: 'CREATESPACERDRAGGABLE',
        itemType: itemType,
        id: id
    };
};

export const createListDraggable = (itemType, id) => {
    return {
        type: 'CREATELISTDRAGGABLE',
        itemType: itemType,
        id: id
    };
};

export const createImageDraggable = (itemType, id) => {
    return {
        type: 'CREATEIMAGEDRAGGABLE',
        itemType: itemType,
        id: id
    };
};

export const resizeItem = (itemId, height) => {
    return {
        type: 'RESIZEITEM',
        itemId: itemId,
        height: height
    }
};

export const changeItemContent = (itemId, text) => {
    return {
        type: 'CHANGECONTENT',
        itemId: itemId,
        text: text
    }
};

export const addNewListItem = (itemId, newListItem) => {
    return {
        type: 'ADDNEWLISTITEM',
        itemId: itemId,
        newListItem: newListItem
    }
};

export const changeListItems = (itemId, listItem) => {
    return {
        type: 'CHANGELISTITEMS',
        itemId: itemId,
        listItem: listItem
    }
};

export const changeItemPadding = (itemId, style) => {
    return {
        type: 'CHANGEITEMPADDING',
        itemId: itemId,
        style: style
    }
};

export const changeItemColor = (itemId, style) => {
    return {
        type: 'CHANGEITEMCOLOR',
        itemId: itemId,
        style: style
    }
};

export const changeItemBackColor = (itemId, style) => {
    return {
        type: 'CHANGEITEMBACKCOLOR',
        itemId: itemId,
        style: style
    }
};

export const changeItemFontSize = (itemId, style) => {
    return {
        type: 'CHANGEITEMFONTSIZE',
        itemId: itemId,
        style: style
    }
};

export const changeItemLineHeight = (itemId, style) => {
    return {
        type: 'CHANGEITEMLINEHEIGHT',
        itemId: itemId,
        style: style
    }
};

export const changeItemFontWeight = (itemId, style) => {
    return {
        type: 'CHANGEITEMFONTWEIGHT',
        itemId: itemId,
        style: style
    }
};

export const changeItemFontStyle = (itemId, style) => {
    return {
        type: 'CHANGEITEMFONTSTYLE',
        itemId: itemId,
        style: style
    }
};

export const changeItemTextDecoration = (itemId, style) => {
    return {
        type: 'CHANGEITEMTEXTDECORATION',
        itemId: itemId,
        style: style
    }
};

export const changeItemTextDecorationColor = (itemId, style) => {
    return {
        type: 'CHANGEITEMTEXTDECORATIONCOLOR',
        itemId: itemId,
        style: style
    }
};

export const changeItemTextAlign = (itemId, style) => {
    return {
        type: 'CHANGEITEMTEXTALIGN',
        itemId: itemId,
        style: style
    }
};

export const changeItemBorder = (itemId, style) => {
    return {
        type: 'CHANGEITEMBORDER',
        itemId: itemId,
        style: style
    }
};

export const changeItemBorderRadius = (itemId, style) => {
    return {
        type: 'CHANGEITEMBORDERRADIUS',
        itemId: itemId,
        style: style
    }
};

export const changeLinkUnderlineDisplay = (itemId, display) => {
    return {
        type: 'CHANGELINKUNDERLINEDISPLAY',
        itemId: itemId,
        display: display
    }
};

export const changeImageSourceUrl = (itemId, src) => {
    return {
        type: 'CHANGEIMAGESOURCEURL',
        itemId: itemId,
        src: src
    }
};

export const changeImageAlt = (itemId, alt) => {
    return {
        type: 'CHANGEIMAGEALT',
        itemId: itemId,
        alt: alt
    }
};

export const changeLink = (itemId, link) => {
    return {
        type: 'CHANGELINK',
        itemId: itemId,
        link: link
    }
};

export const changeListSymbolType = (itemId, symbol) => {
    return {
        type: 'CHANGELISTSYMBOLTYPE',
        itemId: itemId,
        symbolType: symbol
    }
};

export const changeListSymbolSign = (itemId, symbol) => {
    return {
        type: 'CHANGELISTSYMBOLSIGN',
        itemId: itemId,
        sign: symbol
    }
};

export const changeListSymbolSrc = (itemId, symbol) => {
    return {
        type: 'CHANGELISTSYMBOLSRC',
        itemId: itemId,
        src: symbol
    }
};

export const changeListSymbolTrailingChars = (itemId, chars) => {
    return {
        type: 'CHANGELISTSYMBOLTRAILING',
        itemId: itemId,
        chars: chars
    }
};

export const changeListSymbolImageStyle = (itemId, style) => {
    return {
        type: 'CHANGELISTSYMBOLIMAGESTYLE',
        itemId: itemId,
        style: style
    }
};

export const changeListSymbolVerticalAlign = (itemId, style) => {
    return {
        type: 'CHANGELISTSYMBOLVERTICALALIGN',
        itemId: itemId,
        style: style
    }
};

export const changeListSymbolVerticalAlignAdjustment = (itemId, style) => {
    return {
        type: 'CHANGELISTSYMBOLVERTICALALIGNADJUSTMENT',
        itemId: itemId,
        style: style
    }
};

export const changeListSymbolSize = (itemId, style) => {
    return {
        type: 'CHANGELISTSYMBOLSIZE',
        itemId: itemId,
        style: style
    }
};

export const changeListItemsGap = (itemId, style) => {
    return {
        type: 'CHANGELISTITEMSGAP',
        itemId: itemId,
        style: style
    }
};

export const changeListSymbolWidth = (itemId, style) => {
    return {
        type: 'CHANGELISTSYMBOLWIDTH',
        itemId: itemId,
        style: style
    }
};

export const changeListInlineGap = (itemId, style) => {
    return {
        type: 'CHANGELISTITEMINLINEGAP',
        itemId: itemId,
        style: style
    }
};

export const changeCanvasWidth = (style) => {
    return {
        type: 'CHANGECANVASWIDTH',
        style: style
    }
};

export const changeCanvasBackColor = (style) => {
    return {
        type: 'CHANGECANVASBACKCOLOR',
        style: style
    }
};

export const changeCanvasForeColor = (style) => {
    return {
        type: 'CHANGECANVAFORECOLOR',
        style: style
    }
};

export const changeActiveItemId = itemId => {
    return {
        type: 'CHANGEACTIVEITEMID',
        itemId: itemId
    }
};

export const removeDraggable = itemId => {
    return {
        type: 'REMOVEDRAGGABLE',
        id: itemId,
    }
};
export const initRowStyle = (rowId) => {
    return {
        type: 'INITROWSTYLE',
        id: rowId,
    }
};

export const changeRowBackColor = (id, value) => {
    return {
        type: 'CHANGEROWBACKCOLOR',
        id: id,
        value: value
    }
};

export const changeRowAlign = (id, value) => {
    return {
        type: 'CHANGEROWALIGN',
        id: id,
        value: value
    }
};

export const changeInnerHeight = (itemId, height) => {
    return {
        type: 'CHANGEINNERHEIGHT',
        itemId: itemId,
        height: height
    }
};

export const changeProjectName = (name) => {
    return {
        type: 'CHANGEPROJECTNAME',
        value: name
    }
};

export const changePreheader = (name) => {
    return {
        type: 'CHANGEPREHEADER',
        value: name
    }
};

export const openForEditItems = (data) => {
    return {
        type: 'OPENFOREDITITEMS',
        data
    }
};

export const clearItems = () => {
    return {
        type: 'CLEARITEMS'
    }
};