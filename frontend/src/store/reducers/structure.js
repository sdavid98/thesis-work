const initStructureState = {
    activeDataId: null,
    viewMode: 'desktop',
    data: []
};

const structure = (state = {...initStructureState}, action) => {
    switch (action.type) {
        case 'INITCUSTOM':
        case 'INITCOL1':
            return {
                ...state,
                activeDataId: action.id,
                showRegions: true,
                data: [
                    ...state.data,
                    {
                        id: action.id,
                        type: action.colType,
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
                ...state,
                activeDataId: action.id,
                showRegions: true,
                data: [
                    ...state.data,
                    {
                        id: action.id,
                        type: action.colType,
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
                ...state,
                activeDataId: action.id,
                showRegions: true,
                data: [
                    ...state.data,
                    {
                        id: action.id,
                        type: action.colType,
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
                ...state,
                activeDataId: action.id,
                showRegions: true,
                data: [
                    ...state.data,
                    {
                        id: action.id,
                        type: action.colType,
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
                            rowIndex: item.rowIndex + 1,
                            columns: item.columns.map(col => col.id === action.colId ?
                                {...col, rows: [...col.rows, 'row' + item.rowIndex]}
                                : {...col}),
                            rows: [...item.rows, {id: 'row' + item.rowIndex, columns: false, content: false}]
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
                    ...state.data.map(item => item.id === action.dataId ?
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
        case 'OPENFOREDITSTRUCTURE':
            return {
                ...action.data
            };
        case 'CLEARSTRUCTURE':
            return {
                ...initStructureState
            };
        case 'DELETEALLLINKTOCONTENT':
            return {
                ...state,
                data: [
                    ...state.data.map(item => item.type === action.viewMode ?
                        {
                            ...item,
                            rows: [
                                ...item.rows.map(row => {
                                        return {
                                            ...row,
                                            content: false
                                        }
                                    }
                                )
                            ]
                        }
                        : {...item}
                    )
                ]
            };
        default:
            return state;
    }
};

export default structure;