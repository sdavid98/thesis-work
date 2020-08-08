import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const data = [
    {
        id: 'id1',
        columns: [
            {
                id: 'col1',
                level: 0,
                width: '40%',
                rows: ['row1', 'row2']
            },
            {
                id: 'col2',
                level: 0,
                width: '60%',
                rows: ['row8', 'row3', 'row9']
            },
            {
                id: 'col3',
                level: 1,
                width: '50%',
                rows: ['row4', 'row5']
            },
            {
                id: 'col4',
                level: 1,
                width: '50%',
                rows: ['row6', 'row7']
            },
            {
                id: 'col5',
                level: 1,
                width: '25%',
                rows: ['row10']
            },
            {
                id: 'col6',
                level: 1,
                width: '25%',
                rows: ['row11']
            },
            {
                id: 'col7',
                level: 1,
                width: '25%',
                rows: ['row12']
            },
            {
                id: 'col8',
                level: 1,
                width: '25%',
                rows: ['row13']
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
                columns: ['col3', 'col4'],
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
            {
                id: 'row7',
                columns: false,
                content: 'content7'
            },
            {
                id: 'row8',
                columns: false,
                content: 'content8'
            },
            {
                id: 'row9',
                columns: ['col5', 'col6', 'col7', 'col8'],
                content: false
            },
            {
                id: 'row10',
                columns: false,
                content: 'R10'
            },
            {
                id: 'row11',
                columns: false,
                content: 'R11'
            },
            {
                id: 'row12',
                columns: false,
                content: 'R12'
            },
            {
                id: 'row13',
                columns: false,
                content: 'R13'
            },
        ]
    }
];

const renderColumns = (columns, rows, render) => {
    const widths = columns.map(col => col.width);
    const style = {
        display: 'grid',
        gridTemplateColumns: widths.join(' '),
    };
    return (
        <div style={{...style}}>
            {columns.map(col => (
                <div style={{display: 'grid'}}>
                    {col.rows.map(colRow => (
                        rows.filter(row => row.id === colRow).map(row => {
                            if (row.columns) {
                                return render(data.find(data => data.id === 'id1').columns.filter(col => row.columns.indexOf(col.id) >= 0), rows, render);
                            }
                            return <div style={{border: `1px solid rgb(${255-parseInt(widths[0])}, ${255-parseInt(widths[0])}, ${255-parseInt(widths[0])})`}}>{row.content}</div>
                        })
                    ))}
                </div>
            ))}
        </div>
    );
};

const StructureEditor = () => {
    const dispatch = useDispatch();

    const columns = data.find(data => data.id === 'id1').columns.filter(col => col.level === 0);
    return (
        renderColumns(columns, data.find(data => data.id === 'id1').rows, renderColumns)
    );
};

export default StructureEditor;
