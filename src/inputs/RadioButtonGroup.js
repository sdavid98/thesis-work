import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
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
       return <FormControlLabel value={item.text.replace(" ", "")} control={<Radio color="primary" />} label={item.text} />
    });

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">{props.item.label}</FormLabel>
            <RadioGroup className={classes.radios} row name={props.item.id} defaultValue={props.item.items[0].text.replace(" ", "")}>
                {options}
            </RadioGroup>
        </FormControl>
    );
};

export default RadioButtonGroup;