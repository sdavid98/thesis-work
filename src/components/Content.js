import React from "react";
import {useDispatch, useSelector} from "react-redux";
import TextEditor from "./TextEditor";
import ImageContent from "./ImageContent";
import List from "./List";
import {makeDragHeightReCalculate} from "../actions";

const Content = (props) => {
    const activeItemId = useSelector(state => state.activeItemId);
    const dispatch = useDispatch();

    const getPassiveItem = () => {
        if (props.item.type === 'image') {
            return <ImageContent item={props.item} />;
        }
        if (props.item.type === 'list') {
            return <List item={props.item} />;
        }

        return <div dangerouslySetInnerHTML={{__html: props.item.content.text}}></div>;
    };

    const getActiveItem = () => {
        if (props.item.type === 'image') {
            return <ImageContent item={props.item} />;
        }
        if (props.item.type === 'list') {
            return <List item={props.item} />;
        }

        return <div><TextEditor /></div>;
    };

    if (activeItemId === props.item.id) {
        return getActiveItem();
    }
    else {
        return getPassiveItem();
    }
};

export default Content;