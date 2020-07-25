import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import TextInputV2 from "./TextInputV2";

const useStyles = makeStyles({
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 2fr)',
        gridColumnGap: '40px',
        gridRowGap: '10px'
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

const TextGroup = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const activeItemId = useSelector(state => state.activeItemId);
    const activeItem = useSelector(state => state.draggables).find(drag => drag.id === activeItemId);
    const [value, setValue] = useState('');

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
        dispatch(props.item.change(activeItem, props.item.text, e.target.value));
    };

    const colorPicker = (item) => {
        if (['color', 'backgroundColor', 'textDecorationColor'].indexOf(item.watch) >= 0 || item.displayColorPicker) {
            return <input type="color" className={classes.colorPicker} onChange={colorPickerChange} value={getValue(item)} />;
        }
        return false;
    };

    const endAdornment = () => {
        if (['color', 'backgroundColor', 'textDecorationColor'].indexOf(props.item.watch) < 0 || !props.item.displayColorPicker) {
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

    const mapInputGroup = () => {
        if (props.item.items) {
            return props.item.items.map((item, index) => <TextInputV2 key={index} item={item} change={handleChange} />);
        }
        return <TextInputV2 item={props.item} change={handleChange} />;
    };

    const handleChange = (label, value) => {
        dispatch(props.item.change(activeItem, label, value));
    };


    const keyup = (e, text) => {
        if (e.keyCode === 13) {
            //handleChange(text, e.target.value);
            console.log(e.target.value, text);
        }
    };

    const getInputs = (item, index) => {
        console.log(value);
        //setValue(item.value(getValue(item)));
        return <TextInputV2 item={item} change={handleChange} />
        /*return (
         <Grid item key={index}>
             {getLabelIfNotHidden(item)}
             <TextField
                id={item.label.replace(/ /g, "")}
                value={item.value(getValue(item))}
                disabled={['color', 'backgroundColor', 'textDecorationColor'].indexOf(item.watch) >= 0 || item.displayColorPicker || item.disabled}
                onChange={(e) => setValue(e.target.value)}
                InputProps={{
                    endAdornment: endAdornment(),
                    startAdornment: colorPicker(item),
                    onKeyUp: (e) => keyup(e, item.text)
                }}
            />
         </Grid>
    )*/};

    return (
        <>
            <FormLabel className={classes.label} component="legend">{props.item.label}</FormLabel>
            <FormGroup row className={classes['grid']}>
                {mapInputGroup()}
            </FormGroup>
        </>
    );
};

export default TextGroup;