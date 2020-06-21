import React, {useRef} from "react";
import {Rnd} from "react-rnd";
import {useDispatch, useSelector} from "react-redux";
import {activeItem, moveItem, resizeItem} from "../actions";
import Content from "./Content";

const Drag = () => {
    const dispatch = useDispatch();
    const drags = useSelector(state => state.draggables);
    const activeItemId = useSelector(state => state.activeItemId);
    const dragsNotActive = drags.filter(drag => drag.id !== activeItemId);
    const refs = useRef([]);

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
            currentItem.height = currentItem.resizable.state.height;
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

    if (drags.length > 0) {
        return drags.map((item) => (
            <Rnd
                ref={elem => (refs.current[item.id] = elem)}
                key={item.id}
                dragHandleClassName="drag-handler"
                bounds=".canvas"
                size={{ width: item.width,  height: item.height }}
                position={{ x: item.x, y: item.y }}
                enableResizing={{top:false, right:false, bottom:false, left:false, topRight:false, bottomRight:true, bottomLeft:false, topLeft:false}}
                className="draggable"
                onClick={() => dispatch(activeItem(item.id))}
                onResize={() => stopDragOrResizeOnHit(refs.current[item.id], item.id, false)}
                onResizeStop={(a, b, c, data) => dispatch(resizeItem(item.id, {width: data.width + item.width, height: data.height + item.height}))}
                onDragStart={() => dispatch(activeItem(item.id))}
                onDrag={(e, element) => stopDragOrResizeOnHit(element, item.id)}
                onDragStop={(e,element) =>dispatch(moveItem(item.id, element))}
            >
                <div className="drag-handler"></div>
                <Content dragId={item.id}/>
            </Rnd>
        ))
    }
    return false;

};

export default Drag;