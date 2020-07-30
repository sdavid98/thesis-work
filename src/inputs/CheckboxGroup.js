import React from "react";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {makeStyles} from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import {useDispatch, useSelector} from "react-redux";
import FormLabel from "@material-ui/core/FormLabel";
import TextInput from "./TextInput";

const useStyles = makeStyles({
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
    const state = useSelector(state => state);
    const activeItemId = useSelector(state => state.activeItemId);
    const activeItem = useSelector(state => state.draggables).find(drag => drag.id === activeItemId);

    const getValue = (item) => {
        if (!activeItemId) {
            return item.value(state);
        }
        return item.value(activeItem);
        /*if (activeItemId) {
            if (activeItem.rootElementStyle[item.watch]) {
                return activeItem.rootElementStyle[item.watch];
            }
            if (activeItem[item.watch]) {
                return activeItem[item.watch];
            }
            if (activeItem.content.listSymbol[item.watch]) {
                return activeItem.content.listSymbol[item.watch];
            }
            if (activeItem.content.listSymbol.imageStyle[item.watch]) {
                return activeItem.content.listSymbol.imageStyle[item.watch];
            }
            if (activeItem.content.listSymbol.style[item.watch]) {
                return activeItem.content.listSymbol.style[item.watch];
            }
            return activeItem.content[item.watch];
        }
        return '';*/
    };

    const childOption = props.item.items.filter(item => item.childInputs.length > 0 && getValue(item));

    const getChildOptions = () => {
        if (childOption) {
            return childOption.map(parentItem => (
                parentItem.childInputs.map((input, index) => (
                    <TextInput
                        key={index}
                        item={input}
                        change={props.item.change}
                    />))
                )
            );
        }
    };

    const onParentChange = (e, itemText) => {
        if (activeItemId) {
            dispatch(props.item.change(activeItem, itemText, e.target.checked));

            if (props.item.hasAfterChangeFunction) {
                dispatch(props.item.afterChange());
            }
        }
        else {
            try {
                dispatch(props.item.change(state, itemText, e.target.checked));
            }
           catch (e) {}

            if (props.item.hasAfterChangeFunction) {
                dispatch(props.item.afterChange());
            }
        }
    };

    const options = props.item.items.map((item, index) => {
        return <FormControlLabel
            className={classes.label}
            key={index}
            value={item.label.replace(/ /g, "")}
            control={
                <Checkbox
                    onChange={(e) => onParentChange(e, item.label.replace(" ", ""))}
                    color="primary"
                    checked={getValue(item)}
                />
            }
            label={item.label}
        />
    });

    return (
        <>
            <FormLabel className={classes.label} component="legend">{props.item.label}</FormLabel>
            <FormGroup row>
                {options}
                {childOption !== undefined &&
                    <div className={classes.grid}>{getChildOptions()}</div>
                }
            </FormGroup>
        </>
    );
};

export default CheckboxGroup;