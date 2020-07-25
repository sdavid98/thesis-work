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
    const activeItemId = useSelector(state => state.activeItemId);
    const activeItem = useSelector(state => state.draggables).find(drag => drag.id === activeItemId);
    const childOption = props.item.items.filter(item => item.childInputs.length > 0 && item.value(activeItem.rootElementStyle[item.watch]));

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
        dispatch(props.item.change(activeItem, itemText, e.target.checked));
    };

    const options = props.item.items.map((item, index) => {
        const initValue = activeItem.rootElementStyle[item.watch] ? activeItem.rootElementStyle[item.watch] : activeItem[item.watch];
        return <FormControlLabel
            className={classes.label}
            key={index}
            value={item.label.replace(/ /g, "")}
            control={
                <Checkbox
                    onChange={(e) => onParentChange(e, item.label.replace(" ", ""))}
                    color="primary"
                    checked={item.value(initValue)}
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