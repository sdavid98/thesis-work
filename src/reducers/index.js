const initState = {
    draggables: [],
    activeItemId: null,
    makeDragHeightReCalculation: false,
    makeCanvasDimensionsRecalculate: false,
    rowStyles: [],
    canvasStyle: {
        height: '800px',
        width: '600px',
        foreColor: '#ffffff',
        backColor: '#F5F5F5',
        border: 'none #000000 1px'
    }
};

const initTextRootStyle = {
    wordBreak: 'break-all',
    color: '#171717',
    padding: '0px 0px 0px 0px',
    backgroundColor: 'none #ffffff',
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
    backgroundColor: 'none #ffffff',
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
                        y: action.y,
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
                        y: action.y,
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
        case 'CHANGECANVASBORDER':
            return {
                ...state,
                canvasStyle: {...state.canvasStyle, border: action.style}
            };
        case 'CHANGEACTIVEITEMID':
            return {
                ...state,
                activeItemId: action.itemId
            };
        case 'MAKECANVASDIMENSIONSRECALCULATE':
            return {
                ...state,
                makeCanvasDimensionsRecalculate: action.makeReCalculation
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
        default:
            return state;
    }
};

const structure = (state = {activeDataId: null, data: []}, action) => {
    switch (action.type) {
        case 'INITCUSTOM':
        case 'INITCOL1':
            return {
                activeDataId: action.id,
                showRegions: true,
                data: [
                    ...state.data,
                    {
                        id: action.id,
                        colIndex: 1,
                        rowIndex: 1,
                        columns: [
                            {
                                id: 'col0',
                                level: 0,
                                width: action.width,
                                rows: ['row0']
                            },
                        ],
                        rows: [
                            {
                                id: 'row0',
                                columns: false,
                                content: false
                            },
                        ]
                    }
                ]
            };
        case 'INITCOL2':
            return {
                activeDataId: action.id,
                showRegions: true,
                data: [
                    ...state.data,
                    {
                        id: action.id,
                        colIndex: 2,
                        rowIndex: 2,
                        columns: [
                            {
                                id: 'col0',
                                level: 0,
                                width: action.width,
                                rows: ['row0']
                            },
                            {
                                id: 'col1',
                                level: 0,
                                width: action.width,
                                rows: ['row1']
                            },
                        ],
                        rows: [
                            {
                                id: 'row0',
                                columns: false,
                                content: false
                            },
                            {
                                id: 'row1',
                                columns: false,
                                content: false
                            },
                        ]
                    }
                ]
            };
        case 'INITCOL3':
            return {
                activeDataId: action.id,
                showRegions: true,
                data: [
                    ...state.data,
                    {
                        id: action.id,
                        colIndex: 3,
                        rowIndex: 3,
                        columns: [
                            {
                                id: 'col0',
                                level: 0,
                                width: action.width,
                                rows: ['row0']
                            },
                            {
                                id: 'col1',
                                level: 0,
                                width: action.width,
                                rows: ['row1']
                            },
                            {
                                id: 'col2',
                                level: 0,
                                width: action.width,
                                rows: ['row2']
                            },
                        ],
                        rows: [
                            {
                                id: 'row0',
                                columns: false,
                                content: false
                            },
                            {
                                id: 'row1',
                                columns: false,
                                content: false
                            },
                            {
                                id: 'row2',
                                columns: false,
                                content: false
                            },
                        ]
                    }
                ]
            };
        case 'INITCOL4':
            return {
                activeDataId: action.id,
                showRegions: true,
                data: [
                    ...state.data,
                    {
                        id: action.id,
                        colIndex: 4,
                        rowIndex: 4,
                        columns: [
                            {
                                id: 'col0',
                                level: 0,
                                width: action.width,
                                rows: ['row0']
                            },
                            {
                                id: 'col1',
                                level: 0,
                                width: action.width,
                                rows: ['row1']
                            },
                            {
                                id: 'col2',
                                level: 0,
                                width: action.width,
                                rows: ['row2']
                            },
                            {
                                id: 'col3',
                                level: 0,
                                width: action.width,
                                rows: ['row3']
                            },
                        ],
                        rows: [
                            {
                                id: 'row0',
                                columns: false,
                                content: false
                            },
                            {
                                id: 'row1',
                                columns: false,
                                content: false
                            },
                            {
                                id: 'row2',
                                columns: false,
                                content: false
                            },
                            {
                                id: 'row3',
                                columns: false,
                                content: false
                            },
                        ]
                    }
                ]
            };
        case 'CHANGEACTIVEDATAID':
            return {
                ...state,
                activeDataId: action.id,
            };
        case 'ADDCOLUMN':
            return {
                ...state,
                data: [
                    ...state.data.map(item => item.id === state.activeDataId ?
                        {
                            ...item,
                            colIndex: item.colIndex + action.indexChange,
                            rowIndex: item.rowIndex + action.indexChange,
                            columns: [...item.columns,
                                ...action.columns
                            ],
                            rows: [
                                ...item.rows.map(row => row.id === action.rowId ?
                                    {
                                        ...row,
                                        columns: action.colIdArray,
                                        content: false
                                    }
                                    : {...row}
                                ),
                                ...action.rows
                            ]
                        }
                        : {...item}
                    )
                ]
            };
        case 'ADDROW':
            return {
                ...state,
                data: [
                    ...state.data.map(item => item.id === state.activeDataId ?
                        {
                            ...item,
                            rowIndex: item.rowIndex+1,
                            columns: item.columns.map(col => col.id === action.colId ?
                                {...col, rows: [...col.rows, 'row'+item.rowIndex]}
                                : {...col}),
                            rows: [...item.rows, {id: 'row'+item.rowIndex, columns: false, content: false}]
                        }
                        : {...item}
                    )
                ]
            };
        case 'DELETESUBITEM':
            return {
                ...state,
                data: [
                    ...state.data.map(item => item.id === state.activeDataId ?
                        {
                            ...item,
                            columns: item.columns.filter(col => action.deleteColumnIdsArray.indexOf(col.id) < 0).map(col => {
                                col.rows = col.rows.filter(row => action.deleteRowIdsArray.indexOf(row) < 0);
                                return col;
                            }),
                            rows: item.rows.filter(row => action.deleteRowIdsArray.indexOf(row.id) < 0).map(row => {
                                if (row.columns) {
                                    row.columns = row.columns.filter(col => action.deleteColumnIdsArray.indexOf(col) < 0);
                                }
                                return row;
                            }),
                        }
                        : {...item}
                    )
                ]
            };
        case 'CHANGECOLUMNWIDTH':
            return {
                ...state,
                data: [
                    ...state.data.map(item => item.id === state.activeDataId ?
                        {
                            ...item,
                            columns: item.columns.map(col => col.id === action.colId ?
                                {...col, width: action.width}
                                : {...col}),
                        }
                        : {...item}
                    )
                ]
            };
        case 'ADDCONTENT':
            return {
                ...state,
                data: [
                    ...state.data.map(item => item.id === state.activeDataId ?
                        {
                            ...item,
                            rows: [
                                ...item.rows.map(row => row.id === action.rowId ?
                                    {
                                        ...row,
                                        content: action.contentId
                                    }
                                    : {...row}
                                )
                            ]
                        }
                        : {...item}
                    )
                ]
            };
        case 'DELETEROW':
            return {
                ...state,
                activeDataId: null,
                data: state.data.filter(item => item.id !== state.activeDataId)
            };
        case 'SHOWREGIONS':
            return {
                ...state,
                showRegions: !state.showRegions,
            };
        default:
            return state;
    }
};

export {items, structure};