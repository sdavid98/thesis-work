import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import './App.css'
import Panel from "./components/Panel";
import MenuItems from "./components/MenuItems";
import BlockSettings from "./components/BlockSettings";
import {changeActiveItemId} from "./actions";
import Popup from "./components/Popup";
import StructureEditor from "./components/StructureEditor";
import Canvas from "./components/Canvas";
import RowActions from "./components/RowActions";
import Button from "@material-ui/core/Button";
import Generator from "./components/Generator";

const App = () => {
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
					<Button onClick={() => Generator(structureData, contents, canvasStyle.width, rowStyles)} color='primary' variant='contained'>GENERATE</Button>
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
			<Popup open={open === 2} modalCloser={handleClose}>
				{/*<Generator
					columns={structureData.find(data => data.id === activeStructureItem) && structureData.find(data => data.id === activeStructureItem).columns.filter(col => col.level === 0)}
					rows={structureData.find(data => data.id === activeStructureItem) && structureData.find(data => data.id === activeStructureItem).rows}
					dataId={activeStructureItem}
				/>*/}
			</Popup>
		</div>
	);
};

export default App;
