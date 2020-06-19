const initState = {
    counter: 0,
    draggables: [],
    activeItemId: null
};

const counter = (state = initState, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                ...state,
                counter: state.counter + 1
            };
        default:
            return state;
    }
};

const items = (state = initState, action) => {
    switch (action.type) {
        case 'CREATEDRAGGABLE':
            return {
                ...state,
                draggables: [ ...state.draggables,
                    {
                        id: Date.now().toString().substr(-8).split('').map(s => String.fromCharCode(Number(s)+65)).join(''),
                        type: action.itemType,
                        width: 100,
                        height: 70,
                        x: 0,
                        y: 0,
                        content: '',
                        rootElementStyle: {margin: 0}
                    }
                ]
            };
        case 'MOVEITEM':
            return {
                ...state,
                draggables:
                    state.draggables.map(item => {
                        if (item.id === action.itemId) {
                            return {...item, x: action.newPosition.x, y: action.newPosition.y}
                        }
                        return item;
                    })
                
            };
        case 'CHANGECONTENT':
            return {
                ...state,
                draggables:
                    state.draggables.map(item => {
                        if (item.id === action.itemId) {
                            return {...item, content: action.content}
                        }
                        return item;
                    })

            };
        case 'CHANGEITEMSTYLE':
            return {
                ...state,
                draggables:
                    state.draggables.map(item => {
                        if (item.id === action.itemId) {
                            return {...item, rootElementStyle: action.style}
                        }
                        return item;
                    })

            };
        case 'ACTIVEITEM':
            return {
                ...state,
                activeItemId: action.itemId
            };
        default:
            return state;
    }
};

export {counter, items};