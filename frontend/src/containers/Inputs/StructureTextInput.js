import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import TextField from "@material-ui/core/TextField";
import {changeColumnWidth} from "../../store/actions";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    input: {
        '& .MuiInputBase-input': {
            color: 'red',
            fontWeight: 'bold'
        }
    }
}));

const StructureTextInput = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const canvasWidth = useSelector(state => parseInt(state.items.canvasStyle.width));
    const activeStructureItemId = useSelector(state => state.structure.activeDataId);
    const activeStructure = useSelector(state => state.structure.data).find(data => data.id === activeStructureItemId);
    const activeColumn = activeStructure.columns.find(col => col.id === props.colId);
    const [value, setValue] = useState(activeStructure.columns.find(col => col.id === props.colId).width);

    useEffect(() => {
        setValue(activeStructure.columns.find(col => col.id === props.colId).width);
    }, [activeStructure.columns, props.colId]);

    const keyup = (e) => {
        if (e.keyCode === 13) {
            let maxWidth = 0;

            if (activeColumn.level === 0) {
                maxWidth = canvasWidth - activeStructure.columns.filter(col => col.level === 0  && col.id !== props.colId).reduce((accumulator, col) => ({width: parseInt(col.width) + accumulator.width}), {width: 0}).width;
            }
            else {
                const wrapperRow = activeStructure.rows.find(row => row.columns && row.columns.indexOf(props.colId) >= 0);
                if (wrapperRow) {
                    const siblingColIds = wrapperRow.columns.filter(col => col !== props.colId);
                    const parentColWidth = activeStructure.columns.find(col => col.rows.indexOf(wrapperRow.id) >= 0).width;
                    maxWidth = parentColWidth - activeStructure.columns.filter(col => siblingColIds.indexOf(col.id) >= 0).reduce((accumulator, col) => ({width: parseInt(col.width) + accumulator.width}), {width: 0}).width;
                }
            }

            if (maxWidth < e.target.value) {
                setValue(maxWidth);
                dispatch(changeColumnWidth(props.colId, maxWidth));
            }
            else {
                dispatch(changeColumnWidth(props.colId, e.target.value));
            }
        }
    };

    return (
        <TextField
            className={(value === 0 || value === '0') ? classes.input : ''}
            id={props.colId}
            value={value}
            onKeyUp={keyup}
            onChange={(e) => parseInt(e.target.value) >= 0 && setValue(parseInt(e.target.value))}
            InputProps={{endAdornment: 'px'}}
        />
    );
};

export default StructureTextInput;