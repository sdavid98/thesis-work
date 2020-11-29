import React, {useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Rnd} from "react-rnd";
import StructureBuild from "../Structure/StructureBuild";
import {changeActiveStructureId} from "../../store/actions";
import Content from "../Content/Content";

const Canvas = (props) => {
    const ref = useRef([]);
    const dispatch = useDispatch();
    const canvasStyle = useSelector(state => state.items.canvasStyle);
    const rowStyles = useSelector(state => state.items.rowStyles);
    const activeStructureItemId = useSelector(state => state.structure.activeDataId);
    const structureData = useSelector(state => state.structure.data);
    const draggables = useSelector(state => state.items.draggables);

    const getBgColor = id => {
        if (rowStyles.find(style => style.id === id).backgroundColor.split(' ')[0] !== 'none') {
            return rowStyles.find(style => style.id === id).backgroundColor.split(' ')[1];
        }
        return 'unset';
    };

    const onDragHandler = ({x, y}) => {
        if (ref.current.length > 0) {
            console.log(ref)
            ref.current.forEach((item, i) => {
                const target = item.element.getBoundingClientRect();
                if (x >= target.x && x <= target.x + target.width && y >= target.y && y <= target.y + target.height) {
                    console.log('hit!');
                    item.element.style.backgroundColor = '#00000030';
                    console.log(ref);
                }
                else {
                    item.element.style.backgroundColor = 'unset';
                }
            })
        }
    };

    return (
        <>
            <div style={{position: 'absolute'}}>
                {draggables.map((item, index) => (
                    <Rnd className="draggable" onDrag={onDragHandler} dragHandleClassName="handle" key={index} enableResizing={false} bounds={'.ui'} size={{ width: 100,  height: 100 }}>
                        <div className="handle">X</div>
                        <div style={{width: 100, height: 100, ...item.rootElementStyle}}>
                            <Content readOnly={true} item={item}/>
                        </div>
                    </Rnd>
                ))}
            </div>

            <div style={{width: canvasStyle.width, backgroundColor: canvasStyle.foreColor}} className='canvas'>
                {structureData.length > 0 &&
                structureData.map((data, index) => (
                    <div style={{
                        backgroundColor: getBgColor(data.id),
                        display: 'grid',
                        justifyContent: rowStyles.find(style => style.id === data.id).justifyContent
                    }} onClick={() => dispatch(changeActiveStructureId(data.id))} key={index}>
                        <StructureBuild
                            columns={data.columns.filter(col => col.level === 0)}
                            rows={data.rows}
                            dataId={data.id}
                            index={index}
                            active={data.id === activeStructureItemId}
                            isOnCanvas={false}
                            readOnly={props.readOnly || false}
                            ref={ref}
                        />
                    </div>
                ))}
            </div>

        </>
    );
};

export default Canvas;