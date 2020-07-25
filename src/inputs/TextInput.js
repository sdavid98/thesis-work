import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
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
    const [value, setValue] = useState('');

    useEffect(() => {
        setValue('');
    }, [props.item]);

    const getValue = (item) => {
        if (value !== '') {
            return value
        }
        if (activeItemId) {
            return activeItem.rootElementStyle[item.watch] ? activeItem.rootElementStyle[item.watch] : activeItem[item.watch];
        }
        return '';
    };

    const colorPickerChange = (e) => {
        dispatch(props.change(activeItem, props.item.label, e.target.value));
    };

    const colorPicker = (item) => {
        if (item.displayColorPicker) {
            return <input type="color" className={classes.colorPicker} onChange={colorPickerChange} value={props.item.value(getValue(item))} />;
        }
        return false;
    };

    const endAdornment = () => {
        if (!props.item.displayColorPicker) {
            return <InputAdornment position="end">px</InputAdornment>;
        }
        return false;
    };

    const getLabelIfNotHidden = item => {
        if (item.displayLabel) {
            return (
                <Grid item className={classes.label}>
                    {item.label}
                </Grid>
            );
        }
        return false;
    };

    const keyup = (e, text) => {
        if (e.keyCode === 13) {
            dispatch(props.change(activeItem, text, e.target.value));

            if (props.item.hasAfterChangeFunction) {
                dispatch(props.item.afterChange());
            }
        }
    };

    return (
        <Grid item>
            {getLabelIfNotHidden(props.item)}
            <TextField
                id={props.item.label.replace(/ /g, "")}
                value={props.item.value(getValue(props.item))}
                disabled={props.item.disabled}
                onChange={(e) => setValue(e.target.value)}
                InputProps={{
                    endAdornment: endAdornment(),
                    startAdornment: colorPicker(props.item),
                    onKeyUp: (e) => keyup(e, props.item.label)
                }}
            />
        </Grid>
    );
};

export default TextInput;