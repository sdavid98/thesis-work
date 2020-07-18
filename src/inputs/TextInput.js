import React, {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
    grid: {
        gridTemplateColumns: 'repeat(2, 50%)'
    },
    label: {
        fontSize: '0.9rem',
        color: '#0000008a'
    },
    colorPicker: {
        border: 'none',
        outline: 'none',
        background: 'none',
        width: '30px',
        height: '24px'
    },
});

const TextInput = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const activeItemId = useSelector(state => state.activeItemId);
    const activeItem = useSelector(state => state.draggables).find(drag => drag.id === activeItemId);
    const getValue = () => {
        if (activeItemId) {
            return props.value(activeItem.rootElementStyle[props.watch]);
        }
        return '';
    };

    const colorPickerChange = (e) => {
        dispatch(props.change(activeItem, props.text, e.target.value));
    };

    const colorPicker = () => {
        if (['color', 'backgroundColor'].indexOf(props.watch) >= 0) {
            return <input type="color" className={classes.colorPicker} onChange={colorPickerChange} value={getValue()} />;
        }
        return false;
    };

    const endAdornment = () => {
        if (['color', 'backgroundColor'].indexOf(props.watch) < 0) {
            return <InputAdornment position="end">px</InputAdornment>;
        }
        return false;
    };

    return (
        <Grid className={classes.grid}>
            <Grid item className={`${classes.label} text-input-label`}>
                {props.text}
            </Grid>
            <Grid item>
                <TextField
                    id={props.text.replace(/ /g, "")}
                    value={getValue()}
                    disabled={['color', 'backgroundColor'].indexOf(props.watch) >= 0}
                    onChange={(e) => dispatch(props.change(activeItem, props.text, e.target.value))}
                    InputProps={{
                        endAdornment: endAdornment(),
                        startAdornment: colorPicker()
                    }}
                />
            </Grid>
        </Grid>
    );
};

export default TextInput;