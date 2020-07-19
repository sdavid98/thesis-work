import React from 'react';
import {useDispatch} from "react-redux";
import './App.css'
import Panel from "./components/Panel";
import MenuItems from "./components/MenuItems";
import Drag from "./components/Drag";
import BlockSettings from "./components/BlockSettings";
import {changeActiveItemId} from "./actions";

const App = () => {
	const dispatch = useDispatch();

	const clickHandler = (e) => {
		if (e.target.className === 'canvas') {
			dispatch(changeActiveItemId(null));
		}
	};

	return (
		<div className="App">
			<Panel>
				<MenuItems/>
			</Panel>

			<div className="canvas" onClick={clickHandler}>
				<Drag></Drag>
			</div>

			<Panel>
				<BlockSettings/>
			</Panel>
		</div>
	);
};

export default App;
