import React from 'react';
import './App.css'
import Panel from "./components/Panel";
import MenuItems from "./components/MenuItems";
import Drag from "./components/Drag";
import {useDispatch, useSelector} from "react-redux";
import {changeItemContent, changeItemStyle, moveItem} from "./actions";

const App = () => {
	const dispatch = useDispatch();
	const activeItemId = useSelector(state => state.activeItemId);
	const drags = useSelector(state => state.draggables);
	const activeItem = drags.find(drag => drag.id === activeItemId);

	const pos = {
		x: 70,
		y: 120
	};
	const style = {
		color: 'white',
		textAlign: 'right'
	};

	const changeSelectionStyle = () => {
		const range = window.getSelection().getRangeAt(0);
		console.log(range);
		//let content = activeItem.content.split('');
		//content.splice(range.endOffset, 0, '</span>');
		//content.splice(range.startOffset, 0, '<span>');
		//range.surroundContents(document.createElement('span'));
		//dispatch(changeItemContent(activeItemId, window.getSelection().focusNode.innerHTML));
	};

	return (
		<div className="App">
			<Panel>
				<MenuItems/>
			</Panel>

			<div className="canvas">
				<button onClick={() => dispatch(moveItem(activeItemId, pos))}>MOVE</button>
				<button onClick={() => dispatch(changeItemStyle(activeItemId, style))}>STYLE</button>
				<button onClick={() => changeSelectionStyle()}>SELECTION</button>
				<Drag></Drag>
			</div>
		</div>

	);
};

export default App;
