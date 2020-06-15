import React, {useRef} from "react";
import {Rnd} from "react-rnd";
import {useDispatch, useSelector} from "react-redux";
import {moveItem} from "../actions";

const Drag = () => {
    const dispatch = useDispatch();
    const drags = useSelector(state => state.draggables);
    const refs = useRef([]);
    let updateItem = false;
    let id = 0;
    let elem = false;

    const resizeee = (index, elem) => {
        console.log(elem);
        refs.current[index].resizable.state.width = 300;
    };

    const resizeItem = (index, item) => {

    };

    const moveit = (index) => {
        refs.current[index].updatePosition({ x: 200, y: 300 });
    };


    const moved = (index, item) => {
        updateItem = true;
        elem = item;
        id = index;
        console.log(item);
        dispatch(moveItem(index, item));
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
                //onClick={() => moveit(item.id)}
                onDragStop={(a,b) => moved(item.id, b)}
            >
                <div className="drag-handler"></div>
                DRAG
            </Rnd>
        ))
    }
    return false;

};

export default Drag;