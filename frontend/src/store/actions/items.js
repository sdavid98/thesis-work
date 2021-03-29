export const createBasicDraggable = (itemType, id) => {
    return {
        type: 'CREATEBASICDRAGGABLE',
        itemType,
        id
    };
};

export const createButtonDraggable = (itemType, id) => {
    return {
        type: 'CREATEBUTTONDRAGGABLE',
        itemType,
        id
    };
};

export const createSpacerDraggable = (itemType, id) => {
    return {
        type: 'CREATESPACERDRAGGABLE',
        itemType,
        id
    };
};

export const createListDraggable = (itemType, id) => {
    return {
        type: 'CREATELISTDRAGGABLE',
        itemType,
        id
    };
};

export const createImageDraggable = (itemType, id) => {
    return {
        type: 'CREATEIMAGEDRAGGABLE',
        itemType,
        id
    };
};

export const resizeItem = (itemId, height) => {
    return {
        type: 'RESIZEITEM',
        itemId,
        height
    }
};

export const changeItemContent = (itemId, text) => {
    return {
        type: 'CHANGECONTENT',
        itemId,
        text
    }
};

export const addNewListItem = (itemId, newListItem) => {
    return {
        type: 'ADDNEWLISTITEM',
        itemId,
        newListItem
    }
};

export const changeListItems = (itemId, listItem) => {
    return {
        type: 'CHANGELISTITEMS',
        itemId,
        listItem
    }
};

export const changeItemPadding = (itemId, style) => {
    return {
        type: 'CHANGEITEMPADDING',
        itemId,
        style
    }
};

export const changeItemColor = (itemId, style) => {
    return {
        type: 'CHANGEITEMCOLOR',
        itemId,
        style
    }
};

export const changeItemBackColor = (itemId, style) => {
    return {
        type: 'CHANGEITEMBACKCOLOR',
        itemId,
        style
    }
};

export const changeItemFontSize = (itemId, style) => {
    return {
        type: 'CHANGEITEMFONTSIZE',
        itemId,
        style
    }
};

export const changeItemLineHeight = (itemId, style) => {
    return {
        type: 'CHANGEITEMLINEHEIGHT',
        itemId,
        style
    }
};

export const changeItemFontWeight = (itemId, style) => {
    return {
        type: 'CHANGEITEMFONTWEIGHT',
        itemId,
        style
    }
};

export const changeItemFontStyle = (itemId, style) => {
    return {
        type: 'CHANGEITEMFONTSTYLE',
        itemId,
        style
    }
};

export const changeItemTextDecoration = (itemId, style) => {
    return {
        type: 'CHANGEITEMTEXTDECORATION',
        itemId,
        style
    }
};

export const changeItemTextDecorationColor = (itemId, style) => {
    return {
        type: 'CHANGEITEMTEXTDECORATIONCOLOR',
        itemId,
        style
    }
};

export const changeItemTextAlign = (itemId, style) => {
    return {
        type: 'CHANGEITEMTEXTALIGN',
        itemId,
        style
    }
};

export const changeItemBorder = (itemId, style) => {
    return {
        type: 'CHANGEITEMBORDER',
        itemId,
        style
    }
};

export const changeItemBorderRadius = (itemId, style) => {
    return {
        type: 'CHANGEITEMBORDERRADIUS',
        itemId,
        style
    }
};

export const changeLinkUnderlineDisplay = (itemId, display) => {
    return {
        type: 'CHANGELINKUNDERLINEDISPLAY',
        itemId,
        display
    }
};

export const changeImageSourceUrl = (itemId, src) => {
    return {
        type: 'CHANGEIMAGESOURCEURL',
        itemId,
        src
    }
};

export const changeImageAlt = (itemId, alt) => {
    return {
        type: 'CHANGEIMAGEALT',
        itemId,
        alt
    }
};

export const changeLink = (itemId, link) => {
    return {
        type: 'CHANGELINK',
        itemId,
        link
    }
};

export const changeListSymbolType = (itemId, symbol) => {
    return {
        type: 'CHANGELISTSYMBOLTYPE',
        itemId,
        symbolType: symbol
    }
};

export const changeListSymbolSign = (itemId, symbol) => {
    return {
        type: 'CHANGELISTSYMBOLSIGN',
        itemId,
        sign: symbol
    }
};

export const changeListSymbolSrc = (itemId, symbol) => {
    return {
        type: 'CHANGELISTSYMBOLSRC',
        itemId,
        src: symbol
    }
};

export const changeListSymbolTrailingChars = (itemId, chars) => {
    return {
        type: 'CHANGELISTSYMBOLTRAILING',
        itemId,
        chars
    }
};

export const changeListSymbolImageStyle = (itemId, style) => {
    return {
        type: 'CHANGELISTSYMBOLIMAGESTYLE',
        itemId,
        style
    }
};

export const changeListSymbolVerticalAlign = (itemId, style) => {
    return {
        type: 'CHANGELISTSYMBOLVERTICALALIGN',
        itemId,
        style
    }
};

export const changeListSymbolVerticalAlignAdjustment = (itemId, style) => {
    return {
        type: 'CHANGELISTSYMBOLVERTICALALIGNADJUSTMENT',
        itemId,
        style
    }
};

export const changeListSymbolSize = (itemId, style) => {
    return {
        type: 'CHANGELISTSYMBOLSIZE',
        itemId,
        style
    }
};

export const changeListItemsGap = (itemId, style) => {
    return {
        type: 'CHANGELISTITEMSGAP',
        itemId,
        style
    }
};

export const changeListSymbolWidth = (itemId, style) => {
    return {
        type: 'CHANGELISTSYMBOLWIDTH',
        itemId,
        style
    }
};

export const changeListInlineGap = (itemId, style) => {
    return {
        type: 'CHANGELISTITEMINLINEGAP',
        itemId,
        style
    }
};

export const changeCanvasWidth = (style) => {
    return {
        type: 'CHANGECANVASWIDTH',
        style
    }
};

export const changeCanvasBackColor = (style) => {
    return {
        type: 'CHANGECANVASBACKCOLOR',
        style
    }
};

export const changeCanvasForeColor = (style) => {
    return {
        type: 'CHANGECANVAFORECOLOR',
        style
    }
};

export const changeActiveItemId = itemId => {
    return {
        type: 'CHANGEACTIVEITEMID',
        itemId
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
        id,
        value
    }
};

export const changeRowAlign = (id, value) => {
    return {
        type: 'CHANGEROWALIGN',
        id,
        value
    }
};

export const changeInnerHeight = (itemId, height) => {
    return {
        type: 'CHANGEINNERHEIGHT',
        itemId,
        height
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

export const setDisplayedToTrue = (id) => {
    return {
        type: 'SETDISPLAYEDTOTRUE',
        id
    }
};

export const setAllDisplayedToFalse = () => {
    return {
        type: 'SETALLDISPLAYEDTOFALSE'
    }
};

export const cloneRowStylesForMobile = () => {
    return {
        type: 'CLONEROWSTYLESFORMOBILE'
    }
};

export const changeCanvasWidthMobile = (style) => {
    return {
        type: 'CHANGECANVASWIDTHMOBILE',
        style
    }
};