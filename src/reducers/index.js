const initState = {
    counter: 0,
    draggables: [],
    activeItem: {
        id: null,
        type: null,
        content: {},
        rootElementStyle: {}
    },
    range: null
};

const items = (state = initState, action) => {
    switch (action.type) {
        case 'CREATEBASICDRAGGABLE':
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
                        content: {
                            text: '<p>Change me</p>'
                        },
                        rootElementStyle: {margin: 0}
                    }
                ]
            };
        case 'CREATELISTDRAGGABLE':
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
                        content: {
                            text: '<p>Change me</p>',
                            listSymbol: {
                                signs: ['\u03A9'],
                                style: {
                                    paddingLeft: '10px'
                                }
                            }
                        },
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
        case 'RESIZEITEM':
            return {
                ...state,
                draggables:
                    state.draggables.map(item => {
                        if (item.id === action.itemId) {
                            return {...item, width: action.width, height: action.height}
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
                            return {...item, content: {...item.content, text: action.text}}
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
        case 'SELECTACTIVEITEM':
            return {
                ...state,
                activeItem: action.item
            };
        default:
            return state;
    }
};

export {items};