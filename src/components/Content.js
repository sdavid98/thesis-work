import React, {useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {activeItem, changeItemContent, moveItem} from "../actions";
import ContentEditable from "react-contenteditable";
let html = '';
const Content = props => {
    const dispatch = useDispatch();
    const ref = useRef();
    const currentItem = useSelector(state => state.draggables.find(drag => drag.id === props.dragId));
    //const rootStyle = useSelector(state => state)

    const handleChange = e => {
        console.log(e);
        dispatch(changeItemContent(currentItem.id, e.target.value));
        html = e.target.value;
    };

    return (
        <ContentEditable
            style={currentItem.rootElementStyle}
            innerRef={ref}
            html={currentItem.content}
            onChange={handleChange}
            tagName='p'
        />
    )
};

export default Content;