import React from 'react';
import './App.css'
import Panel from "./components/Panel";
import MenuItems from "./components/MenuItems";
import Drag from "./components/Drag";
import {useDispatch, useSelector} from "react-redux";
import {changeItemContent, changeItemStyle, moveItem} from "./actions";
import {Editor} from "@tinymce/tinymce-react";

const App = () => {
	const dispatch = useDispatch();
	const activeItem = useSelector(state => state.activeItem);

	const pos = {
		x: 70,
		y: 120
	};
	const style = {
		color: 'white',
		textAlign: 'right'
	};

	const changeSelectionStyle = () => {
		console.log('CLICK');
		const range = window.getSelection().getRangeAt(0);
		console.log(range);
		// let c = activeItem.content;
		// while (c.search('<div>') >= 0) {
		// 	c = c.replace('<div>', '<br>');
		// 	c = c.replace('</div>', '');
		// }
		// console.log(c);
		// dispatch(changeItemContent(activeItemId, c));
		// let content = activeItem.content.split('');console.log(content);
		// content = content.splice(range.endOffset, 0, '</span>');
		// content = content.splice(range.startOffset, 0, '<span>');
		// content = content.join('');
		range.surroundContents(document.createElement('span'));
		dispatch(changeItemContent(activeItem.id, window.getSelection().focusNode.innerHTML));
	};


	return (
		<div className="App">
			<Panel>
				<MenuItems/>
			</Panel>

			<div className="canvas">
				<button onClick={() => dispatch(moveItem(activeItem.id, pos))}>MOVE</button>
				<button onClick={() => dispatch(changeItemStyle(activeItem.id, style))}>STYLE</button>
				<button onClick={() => changeSelectionStyle()}>SELECTION</button>
				<Drag></Drag>
			</div>
		</div>

	);
};

export default App;
