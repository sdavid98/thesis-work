import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import TextInput from "./TextInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {useDispatch, useSelector} from "react-redux";

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
    }
});

const SelectGroup = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const activeItemId = useSelector(state => state.activeItemId);
    const activeItem = useSelector(state => state.draggables).find(drag => drag.id === activeItemId);

    const mapSelectOptions = () => {
        return props.item.items.map((item, index) => <MenuItem key={index} value={item.label}>{item.label}</MenuItem>);
    };

    const getValue = () => {
        return props.item.value(activeItem);
    };

    const hasChildOption = props.item.items.find(item => item.childInputs.length > 0 && item.label === getValue());

    const getChildInputs = () => {
        return props.item.items.find(item => item.label === getValue()).childInputs.map((childInput, index) => <TextInput key={index} item={childInput} change={props.item.change} />);
    };

    return (
        <>
            <InputLabel className={classes.label} id="demo-simple-select-label">{props.item.label}</InputLabel>
            <FormControl className={classes.grid}>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={getValue()}
                    onChange={e => dispatch(props.item.change(activeItem, e.target.value, e.target.value))}
                >
                    {mapSelectOptions()}
                </Select>
                {hasChildOption && getChildInputs()}
            </FormControl>
        </>
    );
};

export default SelectGroup;