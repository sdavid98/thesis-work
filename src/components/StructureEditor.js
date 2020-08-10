import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import CancelIcon from '@material-ui/icons/Cancel';
import TextField from "@material-ui/core/TextField";
import {addStructureColumn, addStructureRow, deleteStructureSubItem} from "../actions";

const useStyles = makeStyles(() => ({
    grid: {
        '&:hover': {
            backgroundColor: '#e6f2fd'
        },
        '& .MuiGrid-item': {
            alignSelf: 'center',
            padding: '2px 6px',
        }
    },
}));


const StructureEditor = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const activeStructureItem = useSelector(state => state.structure.activeDataId);
    const structureData = useSelector(state => state.structure.data);

    const [activeDataRow, setActiveDataRow] = useState(false);

    const renderColumns = (columns, rows, render, index = 0) => {
        const widths = columns.map(col => col.width+'px');
        const style = {
            display: 'grid',
            gridTemplateColumns: widths.join(' '),
        };

        return (
            <div key={index} style={{...style}}>
                {columns.map((col, index) => (
                    <div key={index} style={{display: 'grid'}}>
                        {col.rows.map(colRow => (
                            rows.filter(row => row.id === colRow).map((row, index) => {
                                if (row.columns) {
                                    return render(structureData.find(data => data.id === activeStructureItem).columns.filter(col => row.columns.indexOf(col.id) >= 0), rows, render, index);
                                }
                                return <div key={index} style={{border: 'black', boxShadow: 'inset 0 0 0 5px #4275d2', padding: '20px 5px', margin: '1px'}}></div>
                            })
                        ))}
                    </div>
                ))}
            </div>
        );
    };

    const handleMouseEnter = (id) => {
        setActiveDataRow(id);
    };

    const handleMouseLeave = () => {
        setActiveDataRow(false);
    };

    const addRow = (colId) => {
        dispatch(addStructureRow(colId));
    };

    const generateColumn = (intColId, intRowId, width, level, double) => {
        if (double) {
            return [
                {
                    id: 'col'+intColId,
                    level: level,
                    width: width,
                    rows: ['row'+intRowId]
                },
                {
                    id: 'col'+(intColId+1),
                    level: level,
                    width: width,
                    rows: ['row'+(intRowId+1)]
                }
            ]
        }
        return [
            {
                id: 'col'+intColId,
                level: level,
                width: width,
                rows: ['row'+intRowId]
            }
        ]
    };

    const generateRow = (intId, double) => {
        if (double) {
            return [
                {
                    id: 'row'+intId,
                    columns: false,
                    content: false
                },
                {
                    id: 'row'+(intId+1),
                    columns: false,
                    content: false
                }
            ]
        }
        return [
            {
                id: 'row'+intId,
                columns: false,
                content: false
            }
        ]
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
        console.log(currentItem);
        const dataToSend = {
            indexChange: rowId && !currentItem.rows.find(row => row.id === rowId).columns ? 2 : 1,
            rowId: rowId,
            columns: (rowId && !currentItem.rows.find(row => row.id === rowId).columns) ? getColumns(currentItem, currentItem.colIndex, true) : getColumns(currentItem, currentItem.colIndex, false),
            colIdArray: rowId && currentItem.rows.find(row => row.id === rowId).columns ? [...currentItem.rows.find(row => row.id === rowId).columns, 'col'+currentItem.colIndex] : ['col'+currentItem.colIndex, 'col'+(currentItem.colIndex+1)],
            rows: rowId && !currentItem.rows.find(row => row.id === rowId).columns ? generateRow(currentItem.rowIndex, true) : generateRow(currentItem.rowIndex, false),
        };
        dispatch(addStructureColumn(dataToSend));
    };

    let deleteRowIdsArray = [];
    let deleteColumnIdsArray = [];

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

    const renderRowListItm = (row, colId) => (
        <Grid container className={classes.grid} onMouseEnter={() => handleMouseEnter(row.id)} onMouseLeave={handleMouseLeave}>
            <Grid item xs={8}>
                Row
            </Grid>
            <Grid item xs={3}>
                <Chip style={activeDataRow === row.id ? {visibility: 'visible'} : {visibility: 'hidden'}} size="small" label="Column" variant="outlined" onClick={e => addColumn(row.id, colId)} icon={<AddCircleOutlineOutlinedIcon />} />
            </Grid>
            <Grid item xs={1}>
                <CancelIcon style={activeDataRow === row.id ? {visibility: 'visible', cursor: 'pointer'} : {visibility: 'hidden'}} size="small" onClick={e => deleteRow(row.id)} />
            </Grid>
        </Grid>
    );

    const renderStructureList = (columns, allRows, self) => {
        if (columns.length > 0 || columns[0].level === 0) {
            return columns.map((col, index) => (
                <li key={index}>
                    <Grid container className={classes.grid} onMouseEnter={() => handleMouseEnter(col.id)} onMouseLeave={handleMouseLeave}>
                        <Grid item xs={4}>
                            Column
                        </Grid>
                        <Grid item xs={3} style={{textAlign: 'end'}}>
                            width:
                        </Grid>
                        <Grid item xs={2}>
                            <TextField id={col.id} value={col.width} onChange={(e) => console.log(e)} InputProps={{endAdornment: 'px'}}/>
                        </Grid>
                        <Grid item xs={2}>
                            <Chip style={activeDataRow === col.id ? {visibility: 'visible'} : {visibility: 'hidden'}} size="small" label="Row" variant="outlined" onClick={e => addRow(col.id)} icon={<AddCircleOutlineOutlinedIcon />} />
                         </Grid>
                        <Grid item xs={1}>
                            <CancelIcon style={activeDataRow === col.id ? {visibility: 'visible', cursor: 'pointer'} : {visibility: 'hidden'}} size="small" onClick={e => deleteColumn(col.id)} />
                        </Grid>
                    </Grid>
                    {col.rows.map((colRow, ind) => (
                        allRows.filter(row => row.id === colRow).map((row, index) => {
                            if (row.columns && row.columns.length > 0) {
                                return (
                                    <div key={index} onMouseEnter={() => handleMouseEnter(row.id)} onMouseLeave={handleMouseLeave}>
                                        <ol key={index}>
                                            <li value={ind+1}>
                                                {renderRowListItm(row, col.id)}
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
                                            {renderRowListItm(row, col.id)}
                                        </li>
                                    </ol>
                                )
                            }
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
            <button onClick={() => addColumn()}>Add column</button>
            {columns &&
                renderColumns(columns, structureData.find(data => data.id === activeStructureItem).rows, renderColumns)
            }
        </>
    );
};

export default StructureEditor;
