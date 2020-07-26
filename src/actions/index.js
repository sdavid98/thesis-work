const createBasicDraggable = (itemType, id) => {
    return {
        type: 'CREATEBASICDRAGGABLE',
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

const changeImageInitialLoadBool = (itemId, bool) => {
    return {
        type: 'CHANGEIMAGEINITIALLOADBOOL',
        itemId: itemId,
        bool: bool
    }
};


export {createBasicDraggable, moveItem, resizeItem, changeActiveItemId, changeItemContent, changeItemPadding,
    createListDraggable, createImageDraggable, addNewListItem, changeListItems, makeDragHeightReCalculate,
    changeItemColor, changeItemBackColor, changeItemFontSize, changeItemLineHeight, changeItemFontWeight,
    changeItemFontStyle, changeItemTextDecoration, changeItemTextDecorationColor, changeItemTextAlign, changeItemBorder,
    changeLinkUnderlineDisplay, changeImageInitialLoadBool, changeImageSourceUrl, changeImageDimensions, changeImageAlt,
    changeLink};