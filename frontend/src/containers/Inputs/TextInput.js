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
    const state = useSelector(state => state.items);
    const activeItemId = useSelector(state => state.items.activeItemId);
    const activeItem = useSelector(state => state.items.draggables).find(drag => drag.id === activeItemId);
    const rowItemId = useSelector(state => state.structure.activeDataId);
    const rowItemStyle = useSelector(state => state.items.rowStyles).find(style => style.id === rowItemId);
    const [value, setValue] = useState('initialStateValue');

    useEffect(() => {
        setValue('initialStateValue');
    }, [props.item, activeItem]);

    const getValue = (item) => {
        if (value !== 'initialStateValue') {
            return value
        }
        if (rowItemId && props.rowSetting) {
            return item.value(rowItemStyle);
        }
        if (!activeItemId) {
            return item.value(state);
        }
        return item.value(activeItem);
    };

    const colorPickerChange = (e) => {
        if (activeItemId) {
            dispatch(props.change(props.rowSetting ? rowItemStyle : activeItem, props.item.label, e.target.value));
        }
        else {
            dispatch(props.change(props.rowSetting ? rowItemStyle : state, props.item.label, e.target.value));
        }
    };

    const colorPicker = (item) => {
        if (item.displayColorPicker) {
            return <input type="color" className={classes.colorPicker} onChange={colorPickerChange} value={getValue(item)} />;
        }
        return false;
    };

    const endAdornment = () => {
        if (!props.item.displayColorPicker && !props.item.hideEndAdornment) {
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
            if (props.rowSetting && rowItemId) {
                dispatch(props.change(rowItemStyle, rowItemId, text, e.target.value));
            }
            if (activeItemId) {
                dispatch(props.change(activeItem, text, e.target.value));

                if (props.item.hasAfterChangeFunction) {
                    dispatch(props.item.afterChange(activeItemId));
                }
            }
            else {
                try {
                    dispatch(props.change(state, text, e.target.value));
                }
                catch (e) {
                    setValue('initialStateValue');
                }

                if (props.item.hasAfterChangeFunction) {
                    dispatch(props.item.afterChange(state));
                }
            }
        }
    };

    return (
        <Grid item>
            {getLabelIfNotHidden(props.item)}
            <TextField
                id={props.item.label.replace(/ /g, "")}
                value={getValue(props.item)}
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