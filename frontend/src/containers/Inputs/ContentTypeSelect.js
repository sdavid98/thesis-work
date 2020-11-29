import React from "react";
import {useDispatch} from "react-redux";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import {
    addContent,
    createBasicDraggable,
    createButtonDraggable,
    createImageDraggable,
    createListDraggable, createSpacerDraggable
} from "../../store/actions";

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
        action: createButtonDraggable
    },
    {
        name: 'list',
        action: createListDraggable
    },
    {
        name: 'divider',
        action: createSpacerDraggable
    }
];

const ContentTypeSelect = (props) => {
    const dispatch = useDispatch();

    const handleClick = (action, name) => {
        const newId = Date.now().toString().substr(-8).split('').map(s => String.fromCharCode(Number(s)+65)).join('');
        dispatch(action(name, newId));
        dispatch(addContent(props.dataId, props.rowId, newId));
        props.closePopup();
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