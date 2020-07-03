import React, {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import TextEditor from "./TextEditor";
import ImageContent from "./ImageContent";
import List from "./List";

const Content = (props) => {
    const activeItemId = useSelector(state => state.activeItemId);
    const activeItem = useSelector(state => state.draggables).find(drag => drag.id === activeItemId);
    const [listItemNum, setListItemNum] = useState(1);

    const handleNewItem = (e, text) => {
        if ([13, 8, 46, 86].indexOf(e.keyCode) !== -1) {
            const div = document.createElement('div');
            div.innerHTML = text;
            setListItemNum([...div.childNodes].filter(node => node.tagName === 'P').length);
        }
    };

    const getPassiveItem = () => {
        if (props.item.type === 'image') {
            return <ImageContent item={props.item} />;
        }
        if (props.item.type === 'list') {
            /*return (<div style={{display: 'inline-grid', gridTemplateColumns: 'auto auto', width: '100%', justifyContent: 'left'}}>
                        <div>{createBullets()}</div>
                        <div dangerouslySetInnerHTML={{__html: props.item.content.text}}></div>
                    </div>);*/
            return <List item={props.item} />;
        }

        return <div dangerouslySetInnerHTML={{__html: props.item.content.text}}></div>;
    };

    const getActiveItem = () => {
        if (props.item.type === 'image') {
            return <ImageContent item={props.item} />;
        }
        if (props.item.type === 'list') {
            /*return (
                <div style={{display: 'inline-grid', gridTemplateColumns: 'auto auto', width: '100%', justifyContent: 'left'}}>
                    {createBullets()}
                    <div><TextEditor keyup={handleNewItem} /></div>
                </div>);*/
            return <List item={props.item} />;
        }

        return <div><TextEditor /></div>;
    };

    const createBullets = () => {
        let bullets = '';
        for (let i = 0; i < listItemNum; i++) {
            if (props.item.content.listSymbol.signs[i]) {
                bullets += `<div>${props.item.content.listSymbol.signs[i]}</div>`;
            } else {
                bullets += `<div>${props.item.content.listSymbol.signs[0]}</div>`;
            }
        }
        return <div style={props.item.content.listSymbol.style} dangerouslySetInnerHTML={{__html: bullets}}></div>;
    };

    if (activeItemId === props.item.id) {
        return getActiveItem();
    }
    else {
        return getPassiveItem();
    }
};

export default Content;