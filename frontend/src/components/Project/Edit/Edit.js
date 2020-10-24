import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import Panel from "../../Panel";
import MenuItems from "../../MenuItems";
import BlockSettings from "../../BlockSettings";
import {changeActiveItemId} from "../../../actions";
import Popup from "../../Popup";
import StructureEditor from "../../StructureEditor";
import Canvas from "../../Canvas";
import RowActions from "../../RowActions";
import Button from "@material-ui/core/Button";
import Generator from "../../Generator";

const Edit = () => {
    const dispatch = useDispatch();
    const canvasStyle = useSelector(state => state.items.canvasStyle);
    const rowStyles = useSelector(state => state.items.rowStyles);
    const structureData = useSelector(state => state.structure.data);
    const contents = useSelector(state => state.items.draggables);

    const clickHandler = (e) => {
        if(e.target.className === 'ui') {
            dispatch(changeActiveItemId(null));
        }
    };

    const [open, setOpen] = React.useState(false);

    const handleOpen = (num) => {
        setOpen(num);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="App" style={{backgroundColor: canvasStyle.backColor}}>
            <div className="ui" onClick={clickHandler}>
                <Panel>
                    <Button onClick={() => Generator(structureData, contents, canvasStyle, rowStyles)} color='primary' variant='contained'>GENERATE</Button>
                    <MenuItems modalOpener={handleOpen} />
                    <RowActions modalOpener={handleOpen}/>
                    <BlockSettings rowSettings={true} />
                </Panel>
                <Canvas/>
                <Panel>
                    <BlockSettings rowSettings={false} />
                </Panel>
            </div>
            <Popup open={open === 1} modalCloser={handleClose}>
                <StructureEditor/>
            </Popup>
        </div>
    );
};

export default Edit;
