import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import './App.css'
import Panel from "./components/Panel";
import MenuItems from "./components/MenuItems";
import BlockSettings from "./components/BlockSettings";
import {changeActiveItemId, changeCanvasWidth, makeCanvasDimensionsReCalculate} from "./actions";
import Popup from "./components/Popup";
import StructureEditor from "./components/StructureEditor";
import Canvas from "./components/Canvas";
import RowActions from "./components/RowActions";

const App = () => {
	const dispatch = useDispatch();
	const canvasStyle = useSelector(state => state.items.canvasStyle);
	const makeDimensionsReCalculate = useSelector(state => state.items.makeCanvasDimensionsRecalculate);

	useEffect(() => {
		if (makeDimensionsReCalculate) {
			dispatch(makeCanvasDimensionsReCalculate(false));
			if (canvasStyle.border.split(' ')[0] !== 'none') {
				dispatch(changeCanvasWidth(parseInt(canvasStyle.width) - 2 * parseInt(canvasStyle.border.split(' ')[2])));
			}
			else {
				dispatch(changeCanvasWidth(parseInt(canvasStyle.width) + 2 * parseInt(canvasStyle.border.split(' ')[2])));
			}
		}
	}, [canvasStyle.border, canvasStyle.width, dispatch, makeDimensionsReCalculate]);

	const clickHandler = (e) => {
		if(e.target.className === 'ui') {
			dispatch(changeActiveItemId(null));
		}
	};

	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div className="App" style={{backgroundColor: canvasStyle.backColor}}>
			<div className="ui" onClick={clickHandler}>
				<Panel>
					<MenuItems modalOpener={handleOpen} />
					<RowActions modalOpener={handleOpen}/>
					<BlockSettings rowSettings={true} />
				</Panel>
				<Canvas/>
				<Panel>
					<BlockSettings rowSettings={false} />
				</Panel>
			</div>
			<Popup open={open} modalCloser={handleClose}>
				<StructureEditor/>
			</Popup>
		</div>
	);
};

export default App;
