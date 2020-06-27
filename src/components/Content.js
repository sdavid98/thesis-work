import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {changeItemContent} from "../actions";
import {Editor} from "@tinymce/tinymce-react";
import TextEditor from "./TextEditor";

const Content = (props) => {
    const dispatch = useDispatch();
    const activeItem = useSelector(state => state.activeItem);
    const [listItemNum, setListItemNum] = useState(1);

    const handleNewItem = (text) => {
        //if (e.keyCode === 13) {
            const div = document.createElement('div');
            div.innerHTML = text;
            console.log([...div.childNodes].filter(node => node.tagName === 'P').length);
            setListItemNum([...div.childNodes].filter(node => node.tagName === 'P').length);
        //}
    };



    const createBullets = () => {
        if (props.item.type === 'list') {
            let bullets = '';
            console.log(listItemNum);
            for (let i = 0; i < listItemNum; i++) {

                if (props.item.content.listSymbol.signs[i]) {
                    bullets += `<div>${props.item.content.listSymbol.signs[i]}</div>`;
                } else {
                    bullets += `<div>${props.item.content.listSymbol.signs[0]}</div>`;
                }
            }
            return <div style={props.item.content.listSymbol.style} dangerouslySetInnerHTML={{__html: bullets}}></div>;
        }
    };

    if (activeItem.id === props.item.id) {
        if (activeItem.type !== 'list') {
            return <div><TextEditor /></div>;
        }
        else {
            return <div>{createBullets()}<div><TextEditor keyup={handleNewItem} /></div></div>;
        }
    }
    else {
        if (activeItem.type !== 'list') {
            return <div dangerouslySetInnerHTML={{__html: props.item.content.text}}></div>;
        }
        else {
            return (
                <div>
                    <div>{createBullets()}</div>
                    <div dangerouslySetInnerHTML={{__html: props.item.content.text}}></div>
                </div>);
        }
    }

    //return activeItem.id === props.item.id ? <div><TextEditor content={props.item.content}/></div> : <div dangerouslySetInnerHTML={{__html: props.item.content}}></div>;
};

export default Content;