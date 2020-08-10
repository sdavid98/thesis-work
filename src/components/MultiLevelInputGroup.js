import React, {useEffect, useState} from "react";
import RadioButtonGroup from "../inputs/RadioButtonGroup";
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import TextInput from "../inputs/TextInput";

const useStyles = makeStyles({
    initial: {
        width: 'calc(50% - 20px)'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 2fr)',
        gridColumnGap: '40px',
        gridRowGap: '10px'
    }
});

const MultiLevelInputGroup = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const activeItemId = useSelector(state => state.items.activeItemId);
    const activeItem = useSelector(state => state.items.draggables).find(drag => drag.id === activeItemId);
    const [activeParentValue, setActiveParentValue] = useState(props.item.value(activeItem));

    useEffect(() => {
        setActiveParentValue(props.item.value(activeItem));
    }, [activeItemId]);

    const childOption = props.item.items.find(item => item.label.replace(/ /g, "") === activeParentValue);
    const onParentChange = value => {
        setActiveParentValue(value);
        dispatch(props.item.change(activeItem, value));

        if (props.item.hasAfterChangeFunction) {
            dispatch(props.item.afterChange());
        }
    };

    const inputWidth = childOption.childInputs.length % 2 === 0 ? 'grid' : 'initial';

    const getChildInputs = () => {
        if (childOption.type === 'text') {
            return childOption.childInputs.map((input, index) => <TextInput key={index} item={input} change={props.item.change} />);
        }
    };

    return (
        <>
            <RadioButtonGroup change={onParentChange} item={props.item} />
            {childOption !== undefined &&
                <div className={classes[inputWidth]}>{getChildInputs()}</div>
            }
        </>
    );
};

export default MultiLevelInputGroup;