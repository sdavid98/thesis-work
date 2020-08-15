import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import StructureBuild from "./StructureBuild";
import {changeActiveStructureId} from "../actions";

const Canvas = () => {
    const dispatch = useDispatch();
    const canvasStyle = useSelector(state => state.items.canvasStyle);
    const rowStyles = useSelector(state => state.items.rowStyles);
    const activeStructureItemId = useSelector(state => state.structure.activeDataId);
    const structureData = useSelector(state => state.structure.data);

    const getBgColor = id => {
        if (rowStyles.find(style => style.id === id).backgroundColor.split(' ')[0] !== 'none') {
            return rowStyles.find(style => style.id === id).backgroundColor.split(' ')[1];
        }
        return 'unset';
    };

    return (
        <div style={{width: canvasStyle.width, backgroundColor: canvasStyle.foreColor, outline: canvasStyle.border}} className='canvas'>
            {structureData.length > 0 &&
            structureData.map((data, index) => (
                <div style={{backgroundColor: getBgColor(data.id), display: 'grid', justifyContent: rowStyles.find(style => style.id === data.id).justifyContent}} onClick={() => dispatch(changeActiveStructureId(data.id))} key={index}>
                    <StructureBuild
                        columns={data.columns.filter(col => col.level === 0)}
                        rows={data.rows}
                        dataId={data.id}
                        index={index}
                        active={data.id === activeStructureItemId}
                        isOnCanvas={true}
                    />
                </div>
            ))}
        </div>
    );
};

export default Canvas;