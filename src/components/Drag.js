import React, {useEffect, useRef, useState} from "react";
import {Rnd} from "react-rnd";
import {useDispatch, useSelector} from "react-redux";
import {
    moveItem,
    resizeItem,
    changeActiveItemId,
    makeDragHeightReCalculate,
    changeCanvasHeight,
    removeDraggable
} from "../actions";
import Content from "./Content";
import {makeStyles} from "@material-ui/core/styles";

import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';

const useStyles = makeStyles({
    noLinkUnderline: {
        '& a': {
            textDecoration: 'none'
        }
    },
});
const Drag = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const drags = useSelector(state => state.draggables);
    const activeItemId = useSelector(state => state.activeItemId);
    const activeItem = useSelector(state => state.draggables).find(drag => drag.id === activeItemId);
    const makeHeightReCalculate = useSelector(state => state.makeDragHeightReCalculation);
    const canvasStyle = useSelector(state => state.canvasStyle);
    const refs = useRef([]);

    let dragsNotActive;
    if (activeItemId) {
        dragsNotActive = drags.filter(drag => drag.id !== activeItemId);
    }

    useEffect(() => {
        if (activeItemId && makeHeightReCalculate) {
            dispatch(makeDragHeightReCalculate(false));
            dispatch(resizeItem(activeItemId, {width: refs.current[activeItemId+'content'].offsetWidth, height: refs.current[activeItemId+'content'].offsetHeight}));
            if (activeItem.y + refs.current[activeItemId+'content'].offsetHeight > parseInt(canvasStyle.height)) {
                dispatch(changeCanvasHeight(activeItem.y + refs.current[activeItemId+'content'].offsetHeight+'px'));
            }
        }
    });

    const stopDragOrResizeOnHit = (currentItem, id, calledForDrag = true) => {
        let stopDrag = false;
        if (calledForDrag) {
            currentItem.height = currentItem.node.clientHeight;
            currentItem.width = currentItem.node.clientWidth;
        }
        else {
            currentItem.x = currentItem.draggable.state.x;
            currentItem.y = currentItem.draggable.state.y;
            currentItem.width = currentItem.resizable.state.width;
            currentItem.height = currentItem.resizable.size.height;
        }

        dragsNotActive.map(item => {
            if (!stopDrag) {
                if (item.y + item.height >= currentItem.y && item.y < currentItem.y + currentItem.height
                    &&
                    (
                        (currentItem.x <= item.x + item.width && currentItem.x + currentItem.width >= item.x + item.width)
                        ||
                        (currentItem.x <= item.x && currentItem.x + currentItem.width >= item.x)
                        ||
                        (item.x < currentItem.x && item.x + item.width > currentItem.x)
                    )
                ) {
                    stopDrag = true;
                }
            }
            return false;
        });

        if (stopDrag) {
            if (calledForDrag) {
                refs.current[id].draggable.state.dragging = false;
                dispatch(moveItem(id, currentItem));
            }
            else {
                refs.current[id].resizable.state.isResizing = false;
                dispatch(resizeItem(id, currentItem));
            }
        }
    };

    const handleResize = (itemId) => {
        stopDragOrResizeOnHit(refs.current[itemId], itemId, false);
        if (activeItem.type !== 'image') {
            updateItemMinHeight(itemId);
        }
    };

    const onStopResize = () => {
        dispatch(resizeItem(activeItemId, {width: refs.current[activeItemId+'content'].offsetWidth, height: refs.current[activeItemId+'content'].offsetHeight}))
    };

    const updateItemMinHeight = (itemId) => {
        if (refs.current[itemId].resizable.state.height < refs.current[itemId+'content'].clientHeight) {
            refs.current[itemId].resizable.state.isResizing = false;
            dispatch(resizeItem(itemId, {height: refs.current[itemId+'content'].clientHeight, width: refs.current[itemId].resizable.state.width}));
        }
    };

    const setActiveItemId = id => {
        dispatch(changeActiveItemId(id));
    };

    const resizeCanvasIfDragOverflows = y => {
        dispatch(changeCanvasHeight(y+'px'));
    };

    const handleDragDelete = (e) => {
        e.stopPropagation();
        dispatch(removeDraggable(activeItemId));
    };

    if (drags.length > 0) {
        return drags.map((item) => {
            if (item.y + item.height > parseInt(canvasStyle.height)) {
                resizeCanvasIfDragOverflows(item.y + item.height);
            }
            let resizeAndDragEnabling = {
                resize: false,
                dragDisabled: true,
                dragClass: 'draggable'
            };
            if (activeItemId === item.id) {
                resizeAndDragEnabling.resize = {top:false, right:true, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false};
                resizeAndDragEnabling.dragDisabled = false;
                resizeAndDragEnabling.dragClass = 'draggable active';
            }
            return (
                <Rnd
                    ref={elem => (refs.current[item.id] = elem)}
                    key={item.id}
                    dragHandleClassName="drag-handler"
                    bounds=".canvas"
                    size={{ width: item.width,  height: 'auto' }}
                    position={{ x: item.x, y: item.y }}
                    enableResizing={resizeAndDragEnabling.resize}
                    disableDragging={resizeAndDragEnabling.dragDisabled}
                    className={resizeAndDragEnabling.dragClass}
                    onClick={() => setActiveItemId(item.id)}
                    onResizeStart={() => setActiveItemId(item.id)}
                    onResize={() => handleResize(item.id)}
                    onResizeStop={onStopResize}
                    onDragStart={() => setActiveItemId(item.id)}
                    onDrag={(e, element) => stopDragOrResizeOnHit(element, item.id)}
                    onDragStop={(e,element) =>dispatch(moveItem(item.id, element))}
                >
                    <div className="drag-delete" onClick={(e) => handleDragDelete(e)}>x</div>
                    <div className="drag-handler"></div>
                    <div
                        className={`content ${!item.underlineLinksIfPresent && classes['noLinkUnderline']}`}
                        style={item.rootElementStyle}
                        ref={elem => (refs.current[item.id+'content'] = elem)}
                    >
                        <Content item={item} />
                    </div>
                </Rnd>
            );
        })
    }
    return false;

};

export default Drag;