import React, {useRef} from "react";
import {Rnd} from "react-rnd";
import {useDispatch, useSelector} from "react-redux";
import {activeItem, moveItem} from "../actions";
import Content from "./Content";

const Drag = () => {
    const dispatch = useDispatch();
    const drags = useSelector(state => state.draggables);
    const activeItemId = useSelector(state => state.activeItemId);
    const dragsNotActive = drags.filter(drag => drag.id !== activeItemId);
    const refs = useRef([]);

    const stopDragOnHit = (e, currentItem, id) => {
        let stopDrag = false;
        dragsNotActive.map(item => {
            if (!stopDrag) {
                if (item.y + item.height >= currentItem.y && item.y < currentItem.y + currentItem.node.clientHeight
                    &&
                    (
                        (currentItem.x <= item.x + item.width && currentItem.x + currentItem.node.clientWidth >= item.x + item.width)
                        ||
                        (currentItem.x <= item.x && currentItem.x + currentItem.node.clientWidth >= item.x)
                        ||
                        (item.x < currentItem.x && item.x + item.width > currentItem.x)
                    )
                ) {
                    stopDrag = true;
                }
            }
        });

        if (stopDrag) {
            console.clear();
            console.log(refs.current[id]);
            refs.current[id].draggable.state.dragging = false;
            dispatch(moveItem(id, currentItem));
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
                onDragStart={() => dispatch(activeItem(item.id))}
                onDrag={(e, element) => stopDragOnHit(e, element, item.id)}
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