import React, {useState} from "react";
import RadioButtonGroup from "../inputs/RadioButtonGroup";
import TextInput from "../inputs/TextInput";
import {useDispatch, useSelector} from "react-redux";

const MultiLevelInputGroup = (props) => {
    const dispatch = useDispatch();
    const activeItemId = useSelector(state => state.activeItemId);
    const activeItem = useSelector(state => state.draggables).find(drag => drag.id === activeItemId);
    const [activeParentValue, setActiveParentValue] = useState(props.item.items[0].text.replace(" ", ""));

    const childOption = props.item.items.find(item => item.text.replace(/ /g, "") === activeParentValue);
    const onParentChange = value => {
        setActiveParentValue(value);
        dispatch(props.item.change(activeItem, value));
    };


    const getChildInputs = () => {
        console.log(childOption);
        if (childOption.type === 'text') {
            return childOption.childInputs.map(input => <TextInput value={input.value} watch={props.item.id} change={props.item.change} text={input.text} />);
        }
    };

    return (
        <div>
            <RadioButtonGroup change={onParentChange} item={props.item} />
            {getChildInputs()}
        </div>
    );
};

export default MultiLevelInputGroup;