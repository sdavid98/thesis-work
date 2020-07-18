const createBasicDraggable = (itemType, id) => {
    console.log(id);
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


export {createBasicDraggable, moveItem, resizeItem, changeActiveItemId, changeItemContent, changeItemPadding, createListDraggable,
    createImageDraggable, addNewListItem, changeListItems, makeDragHeightReCalculate, changeItemColor, changeItemBackColor, changeItemFontSize, changeItemLineHeight};