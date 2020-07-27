const initState = {
    counter: 0,
    draggables: [],
    activeItemId: null,
    makeDragHeightReCalculation: false
};

const initTextRootStyle = {
    wordBreak: 'break-all',
    color: '#171717',
    padding: '0px 0px 0px 0px',
    backgroundColor: '#ffffff',
    fontSize: '14px',
    lineHeight: '16px',
    fontWeight: 'normal',
    fontStyle: 'normal',
    textDecorationLine: 'none',
    textDecorationColor: '#171717',
    textAlign: 'left',
    border: 'none #000000 1px'
};

const initImageRootStyle = {
    padding: '0px 0px 0px 0px',
    backgroundColor: '#ffffff',
    border: 'none #000000 1px'
};

const items = (state = initState, action) => {
    switch (action.type) {
        case 'CREATEBASICDRAGGABLE':
            return {
                ...state,
                draggables: [ ...state.draggables,
                    {
                        id: action.id,
                        type: action.itemType,
                        width: 100,
                        height: 16,
                        x: 0,
                        y: 0,
                        content: {
                            text: '<p>Change me</p>',
                            link: 'https://example.com'
                        },
                        rootElementStyle: {...initTextRootStyle},
                        underlineLinksIfPresent: true
                    }
                ],
                activeItemId: action.id
            };
        case 'CREATELISTDRAGGABLE':
            return {
                ...state,
                draggables: [ ...state.draggables,
                    {
                        id: action.id,
                        type: action.itemType,
                        width: 100,
                        height: 18,
                        x: 0,
                        y: 0,
                        content: {
                            text: ['<p>Change me</p>'],
                            listSymbol: {
                                type: 'Numeric',
                                sign: 'U+2022',
                                trailingCharacters: '',
                                signSrc: '',
                                imageStyle: {
                                    width: 'auto',
                                    symbolImageHeight: '16px'
                                },
                                style: {
                                    listSymbolVerticalAlign: 'start',
                                    listSymbolPaddingTop: '0px',
                                    symbolSize: '14px',
                                    listItemGap: '0px',
                                    inlineGap: '5px'
                                }
                            }
                        },
                        rootElementStyle: {...initTextRootStyle}
                    }
                ],
                activeItemId: action.id
            };
        case 'CREATEIMAGEDRAGGABLE':
            return {
                ...state,
                draggables: [ ...state.draggables,
                    {
                        id: action.id,
                        type: action.itemType,
                        width: 100,
                        height: 100,
                        x: 0,
                        y: 0,
                        content: {
                            text: '<p>Change me</p>',
                            imageSrc: 'https://via.placeholder.com/150/0000FF/FFFFFF/?text=Change+my+url',
                            imageAlt: 'default alt',
                            link: false,
                            initialLoad: true,
                            imageDimensions: {
                                width: 150,
                                height: 150
                            }
                        },
                        rootElementStyle: {...initImageRootStyle}
                    }
                ],
                activeItemId: action.id
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
        case 'ADDNEWLISTITEM':
            return {
                ...state,
                draggables:
                    state.draggables.map(item => {
                        if (item.id === action.itemId) {
                            return {...item, content: {...item.content, text: [...item.content.text, action.newListItem]}}
                        }
                        return item;
                    }),

            };
        case 'CHANGELISTITEMS':
            return {
                ...state,
                draggables:
                    state.draggables.map(item => {
                        if (item.id === action.itemId) {
                            return {...item, content: {...item.content, text: action.listItem}}
                        }
                        return item;
                    })

            };
        case 'CHANGEITEMPADDING':
            return {
                ...state,
                draggables:
                    state.draggables.map(item => {
                        if (item.id === action.itemId) {
                            return {...item, rootElementStyle: {...item.rootElementStyle, padding: action.style}}
                        }
                        return item;
                    })

            };
        case 'CHANGEITEMCOLOR':
            return {
                ...state,
                draggables:
                    state.draggables.map(item => {
                        if (item.id === action.itemId) {
                            return {...item, rootElementStyle: {...item.rootElementStyle, color: action.style}}
                        }
                        return item;
                    })

            };
        case 'CHANGEITEMBACKCOLOR':
            return {
                ...state,
                draggables:
                    state.draggables.map(item => {
                        if (item.id === action.itemId) {
                            return {...item, rootElementStyle: {...item.rootElementStyle, backgroundColor: action.style}}
                        }
                        return item;
                    })

            };
        case 'CHANGEITEMFONTSIZE':
            return {
                ...state,
                draggables:
                    state.draggables.map(item => {
                        if (item.id === action.itemId) {
                            return {...item, rootElementStyle: {...item.rootElementStyle, fontSize: action.style}}
                        }
                        return item;
                    })

            };
        case 'CHANGEITEMLINEHEIGHT':
            return {
                ...state,
                draggables:
                    state.draggables.map(item => {
                        if (item.id === action.itemId) {
                            return {...item, rootElementStyle: {...item.rootElementStyle, lineHeight: action.style}}
                        }
                        return item;
                    })

            };
        case 'CHANGEITEMFONTWEIGHT':
            return {
                ...state,
                draggables:
                    state.draggables.map(item => {
                        if (item.id === action.itemId) {
                            return {...item, rootElementStyle: {...item.rootElementStyle, fontWeight: action.style}}
                        }
                        return item;
                    })

            };
        case 'CHANGEITEMFONTSTYLE':
            return {
                ...state,
                draggables:
                    state.draggables.map(item => {
                        if (item.id === action.itemId) {
                            return {...item, rootElementStyle: {...item.rootElementStyle, fontStyle: action.style}}
                        }
                        return item;
                    })

            };
        case 'CHANGEITEMTEXTDECORATION':
            return {
                ...state,
                draggables:
                    state.draggables.map(item => {
                        if (item.id === action.itemId) {
                            return {...item, rootElementStyle: {...item.rootElementStyle, textDecorationLine: action.style}}
                        }
                        return item;
                    })

            };
        case 'CHANGEITEMTEXTDECORATIONCOLOR':
            return {
                ...state,
                draggables:
                    state.draggables.map(item => {
                        if (item.id === action.itemId) {
                            return {...item, rootElementStyle: {...item.rootElementStyle, textDecorationColor: action.style}}
                        }
                        return item;
                    })

            };
        case 'CHANGEITEMTEXTALIGN':
            return {
                ...state,
                draggables:
                    state.draggables.map(item => {
                        if (item.id === action.itemId) {
                            return {...item, rootElementStyle: {...item.rootElementStyle, textAlign: action.style}}
                        }
                        return item;
                    })

            };
        case 'CHANGEITEMBORDER':
            return {
                ...state,
                draggables:
                    state.draggables.map(item => {
                        if (item.id === action.itemId) {
                            return {...item, rootElementStyle: {...item.rootElementStyle, border: action.style}}
                        }
                        return item;
                    })

            };
        case 'CHANGEIMAGESOURCEURL':
            return {
                ...state,
                draggables:
                    state.draggables.map(item => {
                        if (item.id === action.itemId) {
                            return {...item, content: {...item.content, imageSrc: action.src}}
                        }
                        return item;
                    })

            };
        case 'CHANGEIMAGEALT':
            return {
                ...state,
                draggables:
                    state.draggables.map(item => {
                        if (item.id === action.itemId) {
                            return {...item, content: {...item.content, imageAlt: action.alt}}
                        }
                        return item;
                    })

            };
        case 'CHANGELINK':
            return {
                ...state,
                draggables:
                    state.draggables.map(item => {
                        if (item.id === action.itemId) {
                            return {...item, content: {...item.content, link: action.link}}
                        }
                        return item;
                    })

            };
        case 'CHANGEIMAGEDIMENSIONS':
            return {
                ...state,
                draggables:
                    state.draggables.map(item => {
                        if (item.id === action.itemId) {
                            return {...item, content: {...item.content, imageDimensions: {width: action.width, height: action.height}}}
                        }
                        return item;
                    })

            };
        case 'CHANGELINKUNDERLINEDISPLAY':
            return {
                ...state,
                draggables:
                    state.draggables.map(item => {
                        if (item.id === action.itemId) {
                            return {...item, underlineLinksIfPresent: action.display}
                        }
                        return item;
                    })

            };
        case 'CHANGEIMAGEINITIALLOADBOOL':
            return {
                ...state,
                draggables:
                    state.draggables.map(item => {
                        if (item.id === action.itemId) {
                            return {...item, content: {...item.content, initialLoad: action.bool}}
                        }
                        return item;
                    }),

            };
        case 'CHANGELISTSYMBOLTYPE':
            return {
                ...state,
                draggables:
                    state.draggables.map(item => {
                        if (item.id === action.itemId) {
                            return {...item, content: {...item.content, listSymbol: {...item.content.listSymbol, type: action.symbolType}}}
                        }
                        return item;
                    }),

            };
        case 'CHANGELISTSYMBOLSIGN':
            return {
                ...state,
                draggables:
                    state.draggables.map(item => {
                        if (item.id === action.itemId) {
                            return {...item, content: {...item.content, listSymbol: {...item.content.listSymbol, sign: action.sign}}}
                        }
                        return item;
                    }),

            };
        case 'CHANGELISTSYMBOLSRC':
            return {
                ...state,
                draggables:
                    state.draggables.map(item => {
                        if (item.id === action.itemId) {
                            return {...item, content: {...item.content, listSymbol: {...item.content.listSymbol, signSrc: action.src}}}
                        }
                        return item;
                    }),

            };
        case 'CHANGELISTSYMBOLTRAILING':
            return {
                ...state,
                draggables:
                    state.draggables.map(item => {
                        if (item.id === action.itemId) {
                            return {...item, content: {...item.content, listSymbol: {...item.content.listSymbol, trailingCharacters: action.chars}}}
                        }
                        return item;
                    }),

            };
        case 'CHANGELISTSYMBOLIMAGESTYLE':
            return {
                ...state,
                draggables:
                    state.draggables.map(item => {
                        if (item.id === action.itemId) {
                            return {...item, content: {...item.content, listSymbol: {...item.content.listSymbol, imageStyle: {...item.content.listSymbol.imageStyle, symbolImageHeight: action.style}}}}
                        }
                        return item;
                    }),

            };
        case 'CHANGELISTSYMBOLVERTICALALIGN':
            return {
                ...state,
                draggables:
                    state.draggables.map(item => {
                        if (item.id === action.itemId) {
                            return {...item, content: {...item.content, listSymbol: {...item.content.listSymbol, style: {...item.content.listSymbol.style, listSymbolVerticalAlign: action.style}}}}
                        }
                        return item;
                    }),

            };
        case 'CHANGELISTSYMBOLVERTICALALIGNADJUSTMENT':
            return {
                ...state,
                draggables:
                    state.draggables.map(item => {
                        if (item.id === action.itemId) {
                            return {...item, content: {...item.content, listSymbol: {...item.content.listSymbol, style: {...item.content.listSymbol.style, listSymbolPaddingTop: action.style}}}}
                        }
                        return item;
                    }),

            };
        case 'CHANGELISTSYMBOLSIZE':
            return {
                ...state,
                draggables:
                    state.draggables.map(item => {
                        if (item.id === action.itemId) {
                            return {...item, content: {...item.content, listSymbol: {...item.content.listSymbol, style: {...item.content.listSymbol.style, symbolSize: action.style}}}}
                        }
                        return item;
                    }),

            };
        case 'CHANGELISTITEMSGAP':
            return {
                ...state,
                draggables:
                    state.draggables.map(item => {
                        if (item.id === action.itemId) {
                            return {...item, content: {...item.content, listSymbol: {...item.content.listSymbol, style: {...item.content.listSymbol.style, listItemGap: action.style}}}}
                        }
                        return item;
                    }),

            };
        case 'CHANGELISTITEMINLINEGAP':
            return {
                ...state,
                draggables:
                    state.draggables.map(item => {
                        if (item.id === action.itemId) {
                            return {...item, content: {...item.content, listSymbol: {...item.content.listSymbol, style: {...item.content.listSymbol.style, inlineGap: action.style}}}}
                        }
                        return item;
                    }),

            };
        case 'CHANGEACTIVEITEMID':
            return {
                ...state,
                activeItemId: action.itemId
            };
        case 'MAKEDRAGHEIGHTRECALCULATE':
            return {
                ...state,
                makeDragHeightReCalculation: action.makeReCalculation
            };
        default:
            return state;
    }
};

export {items};