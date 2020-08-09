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
    const [data, setData] = useState([
        {
            id: 'id1',
            columns: [
                {
                    id: 'col1',
                    level: 0,
                    width: '300',
                    rows: ['row1', 'row2']
                },
                {
                    id: 'col2',
                    level: 0,
                    width: '300',
                    rows: ['row6', 'row3']
                },
                {
                    id: 'col4',
                    level: 1,
                    width: '150',
                    rows: ['row4']
                },
                {
                    id: 'col5',
                    level: 1,
                    width: '150',
                    rows: ['row5']
                },
            ],
            rows: [
                {
                    id: 'row1',
                    columns: false,
                    content: 'content1'
                },
                {
                    id: 'row2',
                    columns: false,
                    content: 'content2'
                },
                {
                    id: 'row3',
                    columns: ['col4', 'col5'],
                    content: false
                },
                {
                    id: 'row4',
                    columns: false,
                    content: 'content4'
                },
                {
                    id: 'row5',
                    columns: false,
                    content: 'content5'
                },
                {
                    id: 'row6',
                    columns: false,
                    content: 'content6'
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

    const renderRowListItm = (row) => (
        <Grid container className={classes.grid} onMouseEnter={() => handleMouseEnter(row.id)} onMouseLeave={handleMouseLeave}>
            <Grid item xs={9}>
                Row
            </Grid>
            <Grid item xs={3}>
                <Chip style={activeDataRow === row.id ? {visibility: 'visible'} : {visibility: 'hidden'}} size="small" label="Column" variant="outlined" onClick={console.log} icon={<AddCircleOutlineOutlinedIcon />} />
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
                            <Chip style={activeDataRow === col.id ? {visibility: 'visible'} : {visibility: 'hidden'}} size="small" label="Row" variant="outlined" onClick={console.log} icon={<AddCircleOutlineOutlinedIcon />} />
                        </Grid>
                    </Grid>
                    {col.rows.map((colRow, ind) => (
                        allRows.filter(row => row.id === colRow).map((row, index) => {
                            if (row.columns && row.columns.length > 1) {
                                return (
                                    <div key={index} onMouseEnter={() => handleMouseEnter(row.id)} onMouseLeave={handleMouseLeave}>
                                        <ol key={index}>
                                            <li value={ind+1}>
                                                {renderRowListItm(row, index, ind)}
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
                                            {renderRowListItm(row, index, ind)}
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

    const columns = data.find(data => data.id === 'id1').columns.filter(col => col.level === 0);
    return (
        <>
            <ol>
                {renderStructureList(columns, data.find(data => data.id === 'id1').rows, renderStructureList)}
            </ol>
            {renderColumns(columns, data.find(data => data.id === 'id1').rows, renderColumns)}
        </>
    );
};

export default StructureEditor;
