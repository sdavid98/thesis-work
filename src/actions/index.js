const increment = () => {
    return {
        type: 'INCREMENT'
    }
};

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

const changeItemStyle = (itemId, style) => {
    return {
        type: 'CHANGEITEMSTYLE',
        itemId: itemId,
        style: style
    }
};

const selectActiveItem = item => {
    return {
        type: 'SELECTACTIVEITEM',
        item: item
    }
};


export {increment as default, createBasicDraggable, moveItem, resizeItem, selectActiveItem, changeItemContent, changeItemStyle, createListDraggable};