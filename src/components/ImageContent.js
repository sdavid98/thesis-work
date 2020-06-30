import React from "react";
import {useDispatch, useSelector} from "react-redux";

const ImageContent = (props) => {
    const dispatch = useDispatch();
    const activeItemId = useSelector(state => state.activeItemId);
    const activeItem = useSelector(state => state.draggables).find(drag => drag.id === activeItemId);

    return (
        <div><img src={props.item.content.imageSrc}/></div>
    );
};

export default ImageContent;