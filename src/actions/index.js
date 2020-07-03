const createBasicDraggable = (itemType) => {
    return {
        type: 'CREATEBASICDRAGGABLE',
        itemType: itemType,
    };
};

const createListDraggable = (itemType) => {
    return {
        type: 'CREATELISTDRAGGABLE',
        itemType: itemType,
    };
};

const createImageDraggable = (itemType) => {
    return {
        type: 'CREATEIMAGEDRAGGABLE',
        itemType: itemType,
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

const changeItemStyle = (itemId, style) => {
    return {
        type: 'CHANGEITEMSTYLE',
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


export {createBasicDraggable, moveItem, resizeItem, changeActiveItemId, changeItemContent, changeItemStyle, createListDraggable, createImageDraggable, addNewListItem, changeListItems};