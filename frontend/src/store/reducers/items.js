const initState = {
    projectInfo: {
        name: 'Project Name',
        preheader: 'Email Preheader'
    },
    draggables: [],
    activeItemId: null,
    rowStyles: [],
    canvasStyle: {
        width: '600px',
        foreColor: '#ffffff',
        backColor: '#F5F5F5',
    }
};

const initTextRootStyle = {
    color: '#171717',
    padding: '0px 0px 0px 0px',
    backgroundColor: 'none #ffffff',
    fontSize: '14px',
    lineHeight: '1.2',
    fontWeight: 'normal',
    fontStyle: 'normal',
    textDecorationLine: 'none',
    textDecorationColor: '#171717',
    textAlign: 'left',
    border: 'none #000000 1px',
    borderRadius: '0px'
};

const initButtonStyle = {
    color: '#171717',
    backgroundColor: 'none #ffffff',
    fontSize: '14px',
    lineHeight: '1.2',
    fontWeight: 'normal',
    fontStyle: 'normal',
    textDecorationLine: 'none',
    textDecorationColor: '#171717',
    textAlign: 'center',
    border: 'none #000000 1px',
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'center',
    height: '20px',
    innerHeight: 17,
    borderRadius: '0px'
};

const initSpacerStyle = {
    backgroundColor: 'none #ffffff',
    border: 'none #000000 1px',
    height: '20px',
    lineHeight: '1px',
    fontSize: '1px'
};

const initImageRootStyle = {
    padding: '0px 0px 0px 0px',
    backgroundColor: 'none #ffffff',
    border: 'none #000000 1px',
    borderRadius: '0px'
};

const items = (state = initState, action) => {
    switch (action.type) {
        case 'CREATEBASICDRAGGABLE':
            return {
                ...state,
                draggables: [...state.draggables,
                    {
                        id: action.id,
                        type: action.itemType,
                        width: 100,
                        height: 16,
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
        case 'CREATEBUTTONDRAGGABLE':
            return {
                ...state,
                draggables: [...state.draggables,
                    {
                        id: action.id,
                        type: action.itemType,
                        width: 100,
                        height: 16,
                        content: {
                            text: '<p>Change me</p>',
                            link: 'https://example.com'
                        },
                        rootElementStyle: {...initButtonStyle},
                        underlineLinksIfPresent: true
                    }
                ],
                activeItemId: action.id
            };
        case 'CREATESPACERDRAGGABLE':
            return {
                ...state,
                draggables: [...state.draggables,
                    {
                        id: action.id,
                        type: action.itemType,
                        width: 100,
                        height: 16,
                        content: {
                            text: '<p>Change me</p>',
                            link: 'https://example.com'
                        },
                        rootElementStyle: {...initSpacerStyle},
                        underlineLinksIfPresent: true
                    }
                ],
                activeItemId: action.id
            };
        case 'CREATELISTDRAGGABLE':
            return {
                ...state,
                draggables: [...state.draggables,
                    {
                        id: action.id,
                        type: action.itemType,
                        width: 100,
                        height: 18,
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
                                    inlineGap: '5px',
                                    width: 0
                                }
                            }
                        },
                        underlineLinksIfPresent: true,
                        rootElementStyle: {...initTextRootStyle}
                    }
                ],
                activeItemId: action.id
            };
        case 'CREATEIMAGEDRAGGABLE':
            return {
                ...state,
                draggables: [...state.draggables,
                    {
                        id: action.id,
                        type: action.itemType,
                        width: 100,
                        height: 100,
                        x: 0,
                        y: action.y,
                        content: {
                            text: '',
                            imageSrc: 'https://via.placeholder.com/150/0000FF/FFFFFF/?text=Change+my+url',
                            imageAlt: 'default alt',
                            link: false,
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
        case 'RESIZEITEM':
            return {
                ...state,
                draggables:
                    state.draggables.map(item => {
                        if (item.id === action.itemId) {
                            return {...item, rootElementStyle: {...item.rootElementStyle, height: action.height}}
                        }
                        return item;
                    })

            };
        case 'CHANGEINNERHEIGHT':
            return {
                ...state,
                draggables:
                    state.draggables.map(item => {
                        if (item.id === action.itemId) {
                            return {...item, rootElementStyle: {...item.rootElementStyle, innerHeight: action.height}}
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
                            return {
                                ...item,
                                content: {...item.content, text: [...item.content.text, action.newListItem]}
                            }
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
                            return {
                                ...item,
                                rootElementStyle: {...item.rootElementStyle, backgroundColor: action.style}
                            }
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
                            return {
                                ...item,
                                rootElementStyle: {...item.rootElementStyle, textDecorationLine: action.style}
                            }
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
                            return {
                                ...item,
                                rootElementStyle: {...item.rootElementStyle, textDecorationColor: action.style}
                            }
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
        case 'CHANGEITEMBORDERRADIUS':
            return {
                ...state,
                draggables:
                    state.draggables.map(item => {
                        if (item.id === action.itemId) {
                            return {...item, rootElementStyle: {...item.rootElementStyle, borderRadius: action.style}}
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
        case 'CHANGELISTSYMBOLTYPE':
            return {
                ...state,
                draggables:
                    state.draggables.map(item => {
                        if (item.id === action.itemId) {
                            return {
                                ...item,
                                content: {
                                    ...item.content,
                                    listSymbol: {...item.content.listSymbol, type: action.symbolType}
                                }
                            }
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
                            return {
                                ...item,
                                content: {...item.content, listSymbol: {...item.content.listSymbol, sign: action.sign}}
                            }
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
                            return {
                                ...item,
                                content: {
                                    ...item.content,
                                    listSymbol: {...item.content.listSymbol, signSrc: action.src}
                                }
                            }
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
                            return {
                                ...item,
                                content: {
                                    ...item.content,
                                    listSymbol: {...item.content.listSymbol, trailingCharacters: action.chars}
                                }
                            }
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
                            return {
                                ...item,
                                content: {
                                    ...item.content,
                                    listSymbol: {
                                        ...item.content.listSymbol,
                                        imageStyle: {
                                            ...item.content.listSymbol.imageStyle,
                                            symbolImageHeight: action.style
                                        }
                                    }
                                }
                            }
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
                            return {
                                ...item,
                                content: {
                                    ...item.content,
                                    listSymbol: {
                                        ...item.content.listSymbol,
                                        style: {...item.content.listSymbol.style, listSymbolVerticalAlign: action.style}
                                    }
                                }
                            }
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
                            return {
                                ...item,
                                content: {
                                    ...item.content,
                                    listSymbol: {
                                        ...item.content.listSymbol,
                                        style: {...item.content.listSymbol.style, listSymbolPaddingTop: action.style}
                                    }
                                }
                            }
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
                            return {
                                ...item,
                                content: {
                                    ...item.content,
                                    listSymbol: {
                                        ...item.content.listSymbol,
                                        style: {...item.content.listSymbol.style, symbolSize: action.style}
                                    }
                                }
                            }
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
                            return {
                                ...item,
                                content: {
                                    ...item.content,
                                    listSymbol: {
                                        ...item.content.listSymbol,
                                        style: {...item.content.listSymbol.style, listItemGap: action.style}
                                    }
                                }
                            }
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
                            return {
                                ...item,
                                content: {
                                    ...item.content,
                                    listSymbol: {
                                        ...item.content.listSymbol,
                                        style: {...item.content.listSymbol.style, inlineGap: action.style}
                                    }
                                }
                            }
                        }
                        return item;
                    }),

            };
        case 'CHANGELISTSYMBOLWIDTH':
            return {
                ...state,
                draggables:
                    state.draggables.map(item => {
                        if (item.id === action.itemId) {
                            return {
                                ...item,
                                content: {
                                    ...item.content,
                                    listSymbol: {
                                        ...item.content.listSymbol,
                                        style: {...item.content.listSymbol.style, width: action.style}
                                    }
                                }
                            }
                        }
                        return item;
                    }),

            };
        case 'CHANGECANVASWIDTH':
            return {
                ...state,
                canvasStyle: {...state.canvasStyle, width: action.style}
            };
        case 'CHANGECANVASBACKCOLOR':
            return {
                ...state,
                canvasStyle: {...state.canvasStyle, backColor: action.style}
            };
        case 'CHANGECANVAFORECOLOR':
            return {
                ...state,
                canvasStyle: {...state.canvasStyle, foreColor: action.style}
            };
        case 'CHANGEACTIVEITEMID':
            return {
                ...state,
                activeItemId: action.itemId
            };
        case 'REMOVEDRAGGABLE':
            return {
                ...state,
                draggables: [
                    ...state.draggables.filter(drag => drag.id !== action.id)
                ],
                activeItemId: null
            };
        case 'INITROWSTYLE':
            return {
                ...state,
                activeItemId: null,
                rowStyles: [
                    ...state.rowStyles,
                    {
                        id: action.id,
                        backgroundColor: 'none #ffffff',
                        justifyContent: 'center'
                    }
                ]
            };
        case 'CHANGEROWBACKCOLOR':
            return {
                ...state,
                rowStyles: state.rowStyles.map(style => {
                    if (style.id === action.id) {
                        return {
                            ...style,
                            backgroundColor: action.value
                        }
                    }
                    return style;
                })
            };
        case 'CHANGEROWALIGN':
            return {
                ...state,
                rowStyles: state.rowStyles.map(style => {
                    if (style.id === action.id) {
                        return {
                            ...style,
                            justifyContent: action.value
                        }
                    }
                    return style;
                })
            };
        case 'CHANGEPROJECTNAME':
            return {
                ...state,
                projectInfo: {
                    ...state.projectInfo,
                    name: action.value
                }
            };
        case 'CHANGEPREHEADER':
            return {
                ...state,
                projectInfo: {
                    ...state.projectInfo,
                    preheader: action.value
                }
            };
        case 'OPENFOREDITITEMS':
            return {
                ...action.data
            };
        case 'CLEARITEMS':
            return {
                ...initState
            };
        default:
            return state;
    }
};

export default items;