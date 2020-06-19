const increment = () => {
    return {
        type: 'INCREMENT'
    }
};

const createDraggable = (itemType) => {
    return {
        type: 'CREATEDRAGGABLE',
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

const changeItemContent = (itemId, content) => {
    return {
        type: 'CHANGECONTENT',
        itemId: itemId,
        content: content
    }
};

const changeItemStyle = (itemId, style) => {
    return {
        type: 'CHANGEITEMSTYLE',
        itemId: itemId,
        style: style
    }
};

const activeItem = itemId => {
    return {
        type: 'ACTIVEITEM',
        itemId: itemId
    }
};

export {increment as default, createDraggable, moveItem, activeItem, changeItemContent, changeItemStyle};