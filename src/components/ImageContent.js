import React, {useEffect, useRef} from "react";
import {changeImageDimensions, changeImageInitialLoadBool, resizeItem} from "../actions";
import {useDispatch, useSelector} from "react-redux";

const ImageContent = (props) => {
    const dispatch = useDispatch();
    const ref = useRef();
    const activeItemId = useSelector(state => state.activeItemId);
    const activeItem = useSelector(state => state.draggables).find(drag => drag.id === activeItemId);
    const initLoad = activeItem ? activeItem.content.initialLoad : false;

    useEffect(() => {
        if (activeItemId === props.item.id) {
            dispatch(changeImageInitialLoadBool(activeItemId, false));
            dispatch(resizeItem(activeItemId, {width: props.item.width, height:  Math.floor(props.item.width * (props.item.content.imageDimensions.height / props.item.content.imageDimensions.width))}));
        }
    }, [initLoad]);

    const handleLoad = () => {
        dispatch(changeImageDimensions(activeItemId, {width: parseInt(ref.current.naturalWidth), height: parseInt(ref.current.naturalHeight)}));
        dispatch(changeImageInitialLoadBool(activeItemId, true));
    };

    const wrapWithLink = elem => <a target='_blank' href={props.item.content.link}>{elem}</a>;


    const image = <img
        ref={ref}
        alt={props.item.content.imageAlt}
        src={props.item.content.imageSrc}
        onLoad={handleLoad}
    />;

    return (
        <div>
            {props.item.content.link ? wrapWithLink(image) : image}
        </div>
    );
};

export default ImageContent;