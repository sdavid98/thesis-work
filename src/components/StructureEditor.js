import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
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
    /*const [data, setData] = useState([
        {
            id: 'id1',
            columns: [
                {
                    id: 'col0',
                    level: 0,
                    width: '300',
                    rows: ['row0', 'row1']
                },
                {
                    id: 'col1',
                    level: 0,
                    width: '300',
                    rows: ['row5', 'row2']
                },
                {
                    id: 'col2',
                    level: 1,
                    width: '150',
                    rows: ['row3']
                },
                {
                    id: 'col3',
                    level: 1,
                    width: '150',
                    rows: ['row4']
                },
                {
                    id: 'col4',
                    level: 1,
                    width: '150',
                    rows: ['row4']
                },
            ],
            rows: [
                {
                    id: 'row0',
                    columns: false,
                    content: 'content1'
                },
                {
                    id: 'row1',
                    columns: false,
                    content: 'content2'
                },
                {
                    id: 'row2',
                    columns: ['col3', 'col4'],
                    content: false
                },
                {
                    id: 'row3',
                    columns: false,
                    content: 'content4'
                },
                {
                    id: 'row4',
                    columns: false,
                    content: 'content5'
                },
                {
                    id: 'row5',
                    columns: false,
                    content: 'content6'
                },
            ]
        }
    ]);*/

    const [data, setData] = useState([
        {
            id: 'id1',
            columns: [
                {
                    id: 'col0',
                    level: 0,
                    width: '600',
                    rows: ['row0']
                },
            ],
            rows: [
                {
                    id: 'row0',
                    columns: false,
                    content: 'content1'
                },
            ]
        }
    ]);
    const [activeDataRow, setActiveDataRow] = useState(false);

    const renderColumns = (columns, rows, render) => {
        const widths = columns.map(col => col.width+'px');
        const style = {
            display: 'grid',
            gridTemplateColumns: widths.join(' '),
        };

        return (
            <div style={{...style}}>
                {columns.map((col, index) => (
                    <div key={index} style={{display: 'grid'}}>
                        {col.rows.map(colRow => (
                            rows.filter(row => row.id === colRow).map((row, index) => {
                                if (row.columns) {
                                    return render(data.find(data => data.id === 'id1').columns.filter(col => row.columns.indexOf(col.id) >= 0), rows, render);
                                }
                                return <div key={index} style={{border: 'black', boxShadow: 'inset 0 0 0 5px #4275d2', padding: '5px', margin: '1px'}}>{row.content}</div>
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

    const addRow = (dataId, colId) => {
        setData(data.map(item => item.id === dataId ?
            {
                ...item,
                columns: item.columns.map(col => col.id === colId ?
                    {...col, rows: [...col.rows, 'row'+item.rows.length]}
                    : {...col}),
                rows: [...item.rows, {id: 'row'+item.rows.length, columns: false, content: 'content'+item.rows.length}]
            }
            : {...item}
        ));
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

    const generateRow = (intId) => (
        {
            id: 'row'+intId,
            columns: false,
            content: 'content'+intId
        }
    );

    const addColumn = (dataId, rowId = null, colId = null) => {
        data.map(item => item.id === dataId && console.log(item.columns));

        const getColumns = (item, newColId, double) => {
            if (!rowId) {
                return generateColumn(newColId, item.rows.length, `0`, 0, double);
            }
            if (item.rows.find(row => row.id === rowId).columns) {
                return generateColumn(newColId, item.rows.length, `0`, 1, double);
            }
            return generateColumn(newColId, item.rows.length, `${parseInt(item.columns.find(col => col.id === colId).width) / 2}`, 1, double);
        };
        setData(data.map(item => item.id === dataId ?
            {
                ...item,
                columns: [...item.columns,
                    ...(rowId && !item.rows.find(row => row.id === rowId).columns) ? getColumns(item, item.columns.length, true) : getColumns(item, item.columns.length, false)
                ],
                rows: [
                    ...item.rows.map(row => row.id === rowId ?
                        {
                            ...row,
                            columns: row.columns ? [...row.columns, 'col'+item.columns.length] : ['col'+item.columns.length, 'col'+(item.columns.length+1)]
                        }
                        : {...row}
                    ),
                    generateRow(item.rows.length),
                    rowId && !item.rows.find(row => row.id === rowId).columns ?
                        generateRow(item.rows.length+1) : {}
                ]
            }
            : {...item}
        ));
    };

    const renderRowListItm = (row, colId) => (
        <Grid container className={classes.grid} onMouseEnter={() => handleMouseEnter(row.id)} onMouseLeave={handleMouseLeave}>
            <Grid item xs={9}>
                Row
            </Grid>
            <Grid item xs={3}>
                <Chip style={activeDataRow === row.id ? {visibility: 'visible'} : {visibility: 'hidden'}} size="small" label="Column" variant="outlined" onClick={e => addColumn('id1', row.id, colId)} icon={<AddCircleOutlineOutlinedIcon />} />
            </Grid>
        </Grid>
    );

    const renderStructureList = (columns, allRows, self) => {
        if (columns.length > 0 || columns[0].level === 0) {
            return columns.map((col, index) => (
                <li key={index}>
                    <Grid container className={classes.grid} onMouseEnter={() => handleMouseEnter(col.id)} onMouseLeave={handleMouseLeave}>
                        <Grid item xs={5}>
                            Column
                        </Grid>
                        <Grid item xs={3} style={{textAlign: 'end'}}>
                            width:
                        </Grid>
                        <Grid item xs={2}>
                            <TextField id={col.id} value={col.width} onChange={(e) => console.log(e)} InputProps={{endAdornment: 'px'}}/>
                        </Grid>
                        <Grid item xs={2}>
                            <Chip style={activeDataRow === col.id ? {visibility: 'visible'} : {visibility: 'hidden'}} size="small" label="Row" variant="outlined" onClick={e => addRow('id1', col.id)} icon={<AddCircleOutlineOutlinedIcon />} />
                        </Grid>
                    </Grid>
                    {col.rows.map((colRow, ind) => (
                        allRows.filter(row => row.id === colRow).map((row, index) => {
                            if (row.columns && row.columns.length > 1) {
                                return (
                                    <div key={index} onMouseEnter={() => handleMouseEnter(row.id)} onMouseLeave={handleMouseLeave}>
                                        <ol key={index}>
                                            <li value={ind+1}>
                                                {renderRowListItm(row, col.id)}
                                            </li>
                                            <ol>
                                                {self(data.find(data => data.id === 'id1').columns.filter(col => row.columns.indexOf(col.id) >= 0), allRows, self)}
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
    console.log(data);
    const columns = data.find(data => data.id === 'id1').columns.filter(col => col.level === 0);

    return (
        <>
            <ol>
                {renderStructureList(columns, data.find(data => data.id === 'id1').rows, renderStructureList)}
            </ol>
            <button onClick={() => addColumn('id1')}>Add column</button>
            {renderColumns(columns, data.find(data => data.id === 'id1').rows, renderColumns)}
        </>
    );
};

export default StructureEditor;
