import React from 'react';
import './App.css'
import Panel from "./components/Panel";
import MenuItems from "./components/MenuItems";
import Drag from "./components/Drag";
import BlockSettings from "./components/BlockSettings";

const App = () => {
	const clickHandler = (e) => {
		if (e.target.className === 'canvas') {
			console.log(e, e.target);
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
