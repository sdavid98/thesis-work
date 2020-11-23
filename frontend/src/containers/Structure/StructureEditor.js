import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addStructureColumn, addStructureRow, deleteStructureSubItem} from "../../store/actions";
import StructureDataRowItem from "../../components/Structure/StructureDataRowItem";
import StructureDataColumnItem from "../../components/Structure/StructureDataColumnItem";
import StructureBuild from "./StructureBuild";
import Button from "@material-ui/core/Button";

const generateColumn = (intColId, intRowId, width, level, double) => {
    const qty = double ? 2 : 1;
    let result = [];
    for (let i = 0; i < qty; i++ ) {
        result.push(
            {
                id: 'col'+(intColId+i),
                level: level,
                width: width,
                rows: ['row'+(intRowId+i)]
            }
        )
    }
    return result;
};

const generateRow = (intId, double) => {
    const qty = double ? 2 : 1;
    let result = [];
    for (let i = 0; i < qty; i++ ) {
        result.push(
            {
                id: 'row'+(intId+i),
                columns: false,
                content: false
            }
        )
    }
    return result;
};

const StructureEditor = () => {
    const dispatch = useDispatch();
    const activeStructureItem = useSelector(state => state.structure.activeDataId);
    const structureData = useSelector(state => state.structure.data);
    const [activeDataRow, setActiveDataRow] = useState(false);
    let deleteRowIdsArray = [];
    let deleteColumnIdsArray = [];

    const handleMouseEnter = (id) => {
        setActiveDataRow(id);
    };

    const handleMouseLeave = () => {
        setActiveDataRow(false);
    };

    const addRow = (colId) => {
        dispatch(addStructureRow(colId));
    };

    const addColumn = (rowId = null, colId = null) => {
        const getColumns = (item, newColId, double) => {
            if (!rowId) {
                return generateColumn(newColId, item.rowIndex, `0`, 0, double);
            }
            if (item.rows.find(row => row.id === rowId).columns) {
                return generateColumn(newColId, item.rowIndex, `0`, 1, double);
            }
            return generateColumn(newColId, item.rowIndex, `${parseInt(item.columns.find(col => col.id === colId).width) / 2}`, 1, double);
        };
        const currentItem = structureData.find(item => item.id === activeStructureItem);

        const dataToSend = {
            indexChange: rowId && !currentItem.rows.find(row => row.id === rowId).columns ? 2 : 1,
            rowId: rowId,
            columns: (rowId && !currentItem.rows.find(row => row.id === rowId).columns) ? getColumns(currentItem, currentItem.colIndex, true) : getColumns(currentItem, currentItem.colIndex, false),
            colIdArray: rowId && currentItem.rows.find(row => row.id === rowId).columns ? [...currentItem.rows.find(row => row.id === rowId).columns, 'col'+currentItem.colIndex] : ['col'+currentItem.colIndex, 'col'+(currentItem.colIndex+1)],
            rows: rowId && !currentItem.rows.find(row => row.id === rowId).columns ? generateRow(currentItem.rowIndex, true) : generateRow(currentItem.rowIndex, false),
        };
        dispatch(addStructureColumn(dataToSend));
    };

    const deleteData = () => {
        dispatch(deleteStructureSubItem(deleteColumnIdsArray, deleteRowIdsArray));
    };

    const deleteColumn = (colId) => {
        deleteColumnIdsArray.push(colId);
        structureData.find(data => data.id === activeStructureItem).columns.find(col => col.id === colId).rows.map(row => deleteRow(row));
    };

    const deleteRow = (rowId) => {
        deleteRowIdsArray.push(rowId);
        if (structureData.find(data => data.id === activeStructureItem).rows.find(row => row.id === rowId).columns) {
            structureData.find(data => data.id === activeStructureItem).rows.find(row => row.id === rowId).columns.map(col => deleteColumn(col));
        }
        else {
            deleteData();
        }
    };

    const renderStructureList = (columns, allRows, self) => {
        if (columns.length > 0 || columns[0].level === 0) {
            return columns.map((col, index) => (
                <li key={index}>
                    <StructureDataColumnItem
                        colId={col.id}
                        handleMouseEnter={handleMouseEnter}
                        handleMouseLeave={handleMouseLeave}
                        addRow={addRow}
                        deleteColumn={deleteColumn}
                        active={activeDataRow === col.id}
                    />
                    {col.rows.map((colRow, ind) => (
                        allRows.filter(row => row.id === colRow).map((row, index) => {
                            if (row.columns && row.columns.length > 0) {
                                return (
                                    <div key={index} onMouseEnter={() => handleMouseEnter(row.id)} onMouseLeave={handleMouseLeave}>
                                        <ol key={index}>
                                            <li value={ind+1}>
                                                <StructureDataRowItem
                                                    colId={col.id}
                                                    rowId={row.id}
                                                    handleMouseEnter={handleMouseEnter}
                                                    handleMouseLeave={handleMouseLeave}
                                                    addColumn={addColumn}
                                                    deleteRow={deleteRow}
                                                    active={activeDataRow === row.id}
                                                />
                                            </li>
                                            <ol>
                                                {self(structureData.find(data => data.id === activeStructureItem).columns.filter(col => row.columns.indexOf(col.id) >= 0), allRows, self)}
                                            </ol>
                                        </ol>
                                    </div>
                                )
                            }
                            if (col.rows.length > 1) {
                                return (
                                    <ol key={index}>
                                        <li value={ind+1}>
                                            <StructureDataRowItem
                                                colId={col.id}
                                                rowId={row.id}
                                                handleMouseEnter={handleMouseEnter}
                                                handleMouseLeave={handleMouseLeave}
                                                addColumn={addColumn}
                                                deleteRow={deleteRow}
                                                active={activeDataRow === row.id}
                                            />
                                        </li>
                                    </ol>
                                )
                            }
                            return false;
                        })
                    ))}
                </li>
            ))
        }
    };

    const columns = structureData.find(data => data.id === activeStructureItem).columns.length > 0 ? structureData.find(data => data.id === activeStructureItem).columns.filter(col => col.level === 0) : false;

    return (
        <>
            {columns &&
            <ol>
                {renderStructureList(columns, structureData.find(data => data.id === activeStructureItem).rows, renderStructureList)}
            </ol>}
            <Button size='small' variant="contained" color="primary" onClick={() => addColumn()}>Add column</Button>
            {columns &&
                <StructureBuild
                    columns={columns}
                    rows={structureData.find(data => data.id === activeStructureItem).rows}
                    index={0}
                    active={true}
                    isOnCanvas={false}
                    dataId={activeStructureItem}
                />
            }
        </>
    );
};

export default StructureEditor;
