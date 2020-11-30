export const createStructure = (id, type, width, colType) => {
    switch (type) {
        case 'custom':
            return {
                type: 'INITCUSTOM',
                id: id,
                width: width,
                colType
            };
        case 1:
            return {
                type: 'INITCOL1',
                id: id,
                width: width,
                colType
            };
        case 2:
            return {
                type: 'INITCOL2',
                id: id,
                width: width,
                colType
            };
        case 3:
            return {
                type: 'INITCOL3',
                id: id,
                width: width,
                colType
            };
        case 4:
            return {
                type: 'INITCOL4',
                id: id,
                width: width,
                colType
            };
        default:
            return {
                type: 'INITCUSTOM',
                id: id,
                width: width,
                colType
            };
    }
};

export const changeActiveStructureId = id => {
    return {
        type: 'CHANGEACTIVEDATAID',
        id: id
    }
};

export const addStructureColumn = ({indexChange, columns, rows, rowId, colIdArray}) => {
    return {
        type: 'ADDCOLUMN',
        columns: columns,
        indexChange: indexChange,
        rows: rows,
        rowId: rowId,
        colIdArray: colIdArray
    }
};

export const deleteStructureSubItem = (deleteColumnIdsArray, deleteRowIdsArray) => {
    return {
        type: 'DELETESUBITEM',
        deleteColumnIdsArray: deleteColumnIdsArray,
        deleteRowIdsArray: deleteRowIdsArray
    }
};

export const addStructureRow = (colId) => {
    return {
        type: 'ADDROW',
        colId: colId
    }
};

export const changeColumnWidth = (colId, width) => {
    return {
        type: 'CHANGECOLUMNWIDTH',
        colId: colId,
        width: width
    }
};

export const addContent = (dataId, rowId, contentId) => {
    return {
        type: 'ADDCONTENT',
        rowId: rowId,
        contentId: contentId,
        dataId
    }
};

export const deleteRow = () => {
    return {
        type: 'DELETEROW',
    }
};

export const toggleRegions = () => {
    return {
        type: 'SHOWREGIONS',
    }
};

export const openForEditStructure = (data) => {
    return {
        type: 'OPENFOREDITSTRUCTURE',
        data
    }
};


export const clearStructure = () => {
    return {
        type: 'CLEARSTRUCTURE'
    }
};

export const deleteAllLinkToContent = (viewMode) => {
    return {
        type: 'DELETEALLLINKTOCONTENT',
        viewMode
    }
};
