import React from 'react';
import './App.css'
import Panel from "./components/Panel";
import MenuItems from "./components/MenuItems";
import Drag from "./components/Drag";

const App = () => {
	return (
		<div className="App">
			<Panel>
				<MenuItems/>
			</Panel>

			<div className="canvas">
				<Drag></Drag>
			</div>
		</div>
	);
};

export default App;
