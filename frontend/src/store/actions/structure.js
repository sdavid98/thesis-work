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
        id
    }
};

export const addStructureColumn = ({indexChange, columns, rows, rowId, colIdArray}) => {
    return {
        type: 'ADDCOLUMN',
        columns,
        indexChange,
        rows,
        rowId,
        colIdArray
    }
};

export const deleteStructureSubItem = (deleteColumnIdsArray, deleteRowIdsArray) => {
    return {
        type: 'DELETESUBITEM',
        deleteColumnIdsArray,
        deleteRowIdsArray
    }
};

export const addStructureRow = (colId) => {
    return {
        type: 'ADDROW',
        colId
    }
};

export const changeColumnWidth = (colId, width) => {
    return {
        type: 'CHANGECOLUMNWIDTH',
        colId,
        width
    }
};

export const addContent = (dataId, rowId, contentId) => {
    return {
        type: 'ADDCONTENT',
        rowId,
        contentId,
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

export const setViewMode = (viewMode) => {
    return {
        type: 'SETVIEWMODE',
        viewMode
    }
};

export const initMobileViewChanged = (ratio) => {
    return {
        type: 'INITMOBILEVIEWCHANGED',
        ratio
    }
};
