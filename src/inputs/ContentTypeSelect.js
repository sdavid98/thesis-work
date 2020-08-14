import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import TextInput from "./TextInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {useDispatch, useSelector} from "react-redux";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import {addContent, createBasicDraggable, createImageDraggable, createListDraggable} from "../actions";

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

const options = [
    {
        name: 'text',
        action: createBasicDraggable
    },
    {
        name: 'image',
        action: createImageDraggable
    },
    {
        name: 'button',
        action: createBasicDraggable
    },
    {
        name: 'list',
        action: createListDraggable
    },
    {
        name: 'divider',
        action: createBasicDraggable
    }
];

const ContentTypeSelect = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const activeItemId = useSelector(state => state.items.activeItemId);
    const activeItem = useSelector(state => state.items.draggables).find(drag => drag.id === activeItemId);

    const handleClick = (action, name) => {
        const newId = Date.now().toString().substr(-8).split('').map(s => String.fromCharCode(Number(s)+65)).join('');
        dispatch(action(name, newId));
        dispatch(addContent(props.rowId, newId));
    };

    const mapSelectOptions = () => {
        return options.map((item, index) => <Button onClick={() => handleClick(item.action, item.name)} key={index} value={item.name}>{item.name}</Button>);
    };

    return (
        <ButtonGroup
            orientation="vertical"
            color="primary"
            aria-label="vertical outlined primary button group"
        >
            {mapSelectOptions()}
        </ButtonGroup>
    );
};

export default ContentTypeSelect;