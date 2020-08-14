import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import StructureBuild from "./StructureBuild";
import {makeStyles} from "@material-ui/core/styles";
import {changeActiveStructureId} from "../actions";

const useStyles = makeStyles(() => ({
    row: {
        '&:hover': {
            '& .settings': {
                display: 'block'
            }
        },
    },
    settings: {
        display: 'none',
        position: 'absolute',
        right: '100%',
        width: '80px',
    },

}));

const Canvas = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const canvasStyle = useSelector(state => state.items.canvasStyle);
    const activeStructureItemId = useSelector(state => state.structure.activeDataId);
    const structureData = useSelector(state => state.structure.data);

    return (
        <div style={{width: canvasStyle.width, backgroundColor: canvasStyle.foreColor, outline: canvasStyle.border}} className='canvas'>
            {structureData.length > 0 &&
            structureData.map((data, index) => (
                <div onClick={() => dispatch(changeActiveStructureId(data.id))} key={index}>
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