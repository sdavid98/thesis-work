import React from "react";
import {useSelector} from "react-redux";
import TextEditor from "./TextEditor";
import ImageContent from "./ImageContent";
import List from "./List";
import Spacer from "./Spacer";

const Content = (props) => {
    const activeItemId = useSelector(state => state.items.activeItemId);

    const onLinkClick = (e) => {
        e.preventDefault();
    };

    const getPassiveItem = () => {
        if (props.item.type === 'image') {
            return <ImageContent item={props.item} />;
        }
        if (props.item.type === 'list') {
            return <List item={props.item} />;
        }
        if (props.item.type === 'button') {
            return <div><a onClick={onLinkClick} href={props.item.content.link} target='_blank' dangerouslySetInnerHTML={{__html: props.item.content.text}}></a></div>;
        }
        if (props.item.type === 'divider') {
            return <Spacer item={props.item} />;
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
        if (props.item.type === 'divider') {
            return <Spacer item={props.item} />;
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