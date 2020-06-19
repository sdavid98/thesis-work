import React from 'react';
import './App.css'
import Panel from "./components/Panel";
import MenuItems from "./components/MenuItems";
import Drag from "./components/Drag";
import {useDispatch, useSelector} from "react-redux";
import {changeItemStyle, moveItem} from "./actions";

const App = () => {
	const dispatch = useDispatch();
	const activeItemId = useSelector(state => state.activeItemId);
	const pos = {
		x: 70,
		y: 120
	};
	const style = {
		color: 'white',
		textAlign: 'right'
	};

	return (
		<div className="App">
			<Panel>
				<MenuItems/>
			</Panel>

			<div className="canvas">
				<button onClick={() => dispatch(moveItem(activeItemId, pos))}>MOVE</button>
				<button onClick={() => dispatch(changeItemStyle(activeItemId, style))}>STYLE</button>
				<Drag></Drag>
			</div>
		</div>

	);
};

export default App;
