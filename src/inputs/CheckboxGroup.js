import React, {useState} from "react";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {makeStyles} from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import TextInput from "./TextInput";
import Checkbox from "@material-ui/core/Checkbox";
import {useDispatch, useSelector} from "react-redux";
import FormLabel from "@material-ui/core/FormLabel";

const useStyles = makeStyles({
    initial: {
        width: 'calc(50% - 20px)'
    },
    label: {
        fontSize: '0.9rem',
        marginLeft: 0,
        '& .MuiTypography-body1': {
            fontSize: '0.9rem',
        }
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 2fr)',
        gridColumnGap: '40px',
        gridRowGap: '10px'
    }
});

const CheckboxGroup = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const activeItemId = useSelector(state => state.activeItemId);
    const activeItem = useSelector(state => state.draggables).find(drag => drag.id === activeItemId);
    const childOption = props.item.items.filter(item => item.childInputs.length > 0 && item.value(activeItem.rootElementStyle[item.watch]));
    const inputWidth = childOption.childInputs && childOption.childInputs.length % 2 === 0 ? 'grid' : 'initial';

    const getChildOptions = () => {
        if (childOption) {
            return childOption.map(parentItem => (
                parentItem.childInputs.map((input, index) => (
                    <TextInput
                        key={index}
                        value={input.value}
                        watch={input.watch}
                        change={props.item.change}
                        text={input.text}
                        displayColorPicker={input.displayColorPicker}
                    />))
                )
            );
        }
    };

    const onParentChange = (e, itemText) => {
        dispatch(props.item.change(activeItem, itemText, e.target.checked));
    };

    const options = props.item.items.map((item, index) => {
        return <FormControlLabel
            className={classes.label}
            key={index}
            value={item.text.replace(/ /g, "")}
            control={
                <Checkbox
                    onChange={(e) => onParentChange(e, item.text.replace(" ", ""))}
                    color="primary"
                    checked={item.value(activeItem.rootElementStyle[item.watch])}
                />
            }
            label={item.text}
        />
    });

    return (
        <>
            <FormLabel className={classes.label} component="legend">{props.item.label}</FormLabel>
            <FormGroup row>
                {options}
                <div className={classes['grid']}>{getChildOptions()}</div>
            </FormGroup>
        </>
    );
};

export default CheckboxGroup;