import React, {useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Rnd} from "react-rnd";
import StructureBuild from "../Structure/StructureBuild";
import {addContent, changeActiveStructureId, setDisplayedToTrue} from "../../store/actions";
import Content from "../Content/Content";

const Canvas = (props) => {
    const ref = useRef([]);
    const dispatch = useDispatch();
    const {canvasStyle, rowStyles, draggables} = useSelector(state => state.items);
    const activeStructureItemId = useSelector(state => state.structure.activeDataId);
    const viewMode = useSelector(state => state.structure.viewMode);
    const isMobileViewChanged = useSelector(state => state.structure.isMobileViewChanged);
    const canvasWidth = viewMode === 'desktop' ? canvasStyle.width : canvasStyle.widthMobile;
    let structureData = useSelector(state => state.structure.data);

    if (isMobileViewChanged) {
        structureData = structureData.filter(data => data.type === viewMode);
    }

    const getBgColor = id => {
        if (rowStyles.find(style => style.id === id).backgroundColor.split(' ')[0] !== 'none') {
            return rowStyles.find(style => style.id === id).backgroundColor.split(' ')[1];
        }
        return 'unset';
    };

    const onDragHandler = ({x, y}) => {
        if (ref.current.filter(curr => curr.element).length > 0) {
            ref.current.filter(curr => curr.element).forEach((item, i) => {
                const target = item.element.getBoundingClientRect();
                if (x >= target.x && x <= target.x + target.width && y >= target.y && y <= target.y + target.height) {
                    item.element.style.backgroundColor = '#00000030';
                } else {
                    item.element.style.backgroundColor = 'unset';
                }
            })
        }
    };

    const onDragEndHandler = ({x, y}, contentId) => {
        if (ref.current.filter(curr => curr.element).length > 0) {
            ref.current.filter(curr => curr.element).forEach((item, i) => {
                const target = item.element.getBoundingClientRect();
                if (x >= target.x && x <= target.x + target.width && y >= target.y && y <= target.y + target.height) {
                    ref.current = [];
                    dispatch(addContent(item.dataId, item.rowId, contentId));
                    dispatch(setDisplayedToTrue(contentId));
                    console.log('changed to true');
                }
            })
        }
    };

    return (
        <>
            <div style={{position: 'absolute'}}>
                {console.log(draggables)}
                {draggables.filter(item => !item.displayed).map((item, index) => (
                    <Rnd className="draggable" onDragStop={pos => onDragEndHandler(pos, item.id)} onDrag={onDragHandler}
                         dragHandleClassName="handle" key={index} enableResizing={false} bounds={'.ui'}
                         size={{width: 100, height: 100}} default={{x: 5, y: index * 70}}>
                        <div className="handle">X</div>
                        <div style={{width: 100, height: 100, ...item.rootElementStyle}}>
                            <Content readOnly={true} item={item}/>
                        </div>
                    </Rnd>
                ))}
            </div>
            <div style={{width: canvasWidth, backgroundColor: canvasStyle.foreColor}} className='canvas'>
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
                            isOnCanvas={true}
                            readOnly={props.readOnly || false}
                            ref={ref}
                            restructure={true}
                        />
                    </div>
                ))}
            </div>

        </>
    );
};

export default Canvas;