import React, {useState} from "react";
import RadioButtonGroup from "../inputs/RadioButtonGroup";
import TextInput from "../inputs/TextInput";
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";

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
    const activeItemId = useSelector(state => state.activeItemId);
    const activeItem = useSelector(state => state.draggables).find(drag => drag.id === activeItemId);
    const [activeParentValue, setActiveParentValue] = useState(props.item.value(activeItem));

    const childOption = props.item.items.find(item => item.text.replace(/ /g, "") === activeParentValue);
    const onParentChange = value => {
        setActiveParentValue(value);
        dispatch(props.item.change(activeItem, value));
    };

    const inputWidth = childOption.childInputs.length % 2 === 0 ? 'grid' : 'initial';

    const getChildInputs = () => {
        if (childOption.type === 'text') {
            return childOption.childInputs.map((input, index) => <TextInput key={index} value={input.value} watch={props.item.id} change={props.item.change} text={input.text} />);
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