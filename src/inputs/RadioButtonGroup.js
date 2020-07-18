import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    group: {
        margin: '10px 0'
    },
    label: {
        fontSize: '1.2rem',
        color: '#0000008a',
        '&.Mui-focused': {
            color: '#0000008a'
        }
    },
    radios: {
        '& .MuiFormControlLabel-root': {
            flexBasis: '33%',
            marginLeft: 0,
            marginRight: 0
        }
    }
});

const RadioButtonGroup = (props) => {
    const dispatch = useDispatch();
    const activeItemId = useSelector(state => state.activeItemId);
    const activeItem = useSelector(state => state.draggables).find(drag => drag.id === activeItemId);
    const classes = useStyles();

    const options = props.item.items.map(item => {
       return <FormControlLabel value={item.text.replace(/ /g, "")} control={<Radio color="primary" />} label={item.text} />
    });

    const handleChange = (event) => {
        props.change(event.target.value);
    };

    return (
        <FormControl className={classes.group} component="fieldset">
            <FormLabel className={classes.label} component="legend">{props.item.label}</FormLabel>
            <RadioGroup onChange={handleChange} className={classes.radios} row name={props.item.id} defaultValue={props.item.items[0].text.replace(/ /g, "")}>
                {options}
            </RadioGroup>
        </FormControl>
    );
};

export default RadioButtonGroup;