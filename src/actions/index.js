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
    console.log(position);
    return {
        type: 'MOVEITEM',
        itemId: itemId,
        newPosition: position
    }
};

export {increment as default, createDraggable, moveItem};