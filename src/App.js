import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import './App.css'
import Panel from "./components/Panel";
import MenuItems from "./components/MenuItems";
import Drag from "./components/Drag";
import BlockSettings from "./components/BlockSettings";
import {changeActiveItemId, changeCanvasHeight, changeCanvasWidth, makeCanvasDimensionsReCalculate} from "./actions";
import SandBox from "./SandBox";
import Popup from "./components/Popup";
import StructureEditor from "./components/StructureEditor";

const App = () => {
	const dispatch = useDispatch();
	const canvasStyle = useSelector(state => state.items.canvasStyle);
	const makeDimensionsReCalculate = useSelector(state => state.items.makeCanvasDimensionsRecalculate);

	useEffect(() => {
		if (makeDimensionsReCalculate) {
			dispatch(makeCanvasDimensionsReCalculate(false));
			if (canvasStyle.border.split(' ')[0] !== 'none') {
				dispatch(changeCanvasWidth(parseInt(canvasStyle.width) - 2 * parseInt(canvasStyle.border.split(' ')[2])));
				dispatch(changeCanvasHeight(parseInt(canvasStyle.height) - 2 * parseInt(canvasStyle.border.split(' ')[2])));
			}
			else {
				dispatch(changeCanvasWidth(parseInt(canvasStyle.width) + 2 * parseInt(canvasStyle.border.split(' ')[2])));
				dispatch(changeCanvasHeight(parseInt(canvasStyle.height) + 2 * parseInt(canvasStyle.border.split(' ')[2])));
			}
		}
	}, [makeDimensionsReCalculate]);

	const clickHandler = (e) => {
		if(e.target.className === 'App') {
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
		<div className="App" onClick={clickHandler} style={{backgroundColor: canvasStyle.backColor}}>
			<div className="ui">
				<Panel>
					<MenuItems modalOpener={handleOpen} />
				</Panel>
				<div style={{width: canvasStyle.width, height: canvasStyle.height, backgroundColor: canvasStyle.foreColor, outline: canvasStyle.border}} className="canvas">
					<SandBox/>
				</div>
				<Panel>
					<BlockSettings/>
				</Panel>
			</div>
			<Popup open={open} modalCloser={handleClose}>
				<StructureEditor/>
			</Popup>
		</div>
	);
};

export default App;
