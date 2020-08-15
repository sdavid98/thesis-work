import React from "react";
import {useDispatch, useSelector} from "react-redux";
import TextEditor from "./TextEditor";
import ImageContent from "./ImageContent";
import List from "./List";
import Spacer from "./Spacer";
import {changeActiveItemId, removeDraggable} from "../actions";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    noLinkUnderline: {
        '& a': {
            textDecoration: 'none'
        }
    },
});

const Content = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const activeItemId = useSelector(state => state.items.activeItemId);

    const handleDragDelete = (e) => {
        e.stopPropagation();
        dispatch(removeDraggable(activeItemId));
    };

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

    const getBgColor = () => {
        if (props.item.rootElementStyle.backgroundColor.split(' ')[0] !== 'none') {
            return props.item.rootElementStyle.backgroundColor.split(' ')[1];
        }
        return 'unset';
    };


    return (
        <div className={props.item.id === activeItemId ? 'active-content' : ''} style={{height: '100%', position: 'relative'}} onClick={() => dispatch(changeActiveItemId(props.item.id))}>
            <div className="drag-delete" onClick={(e) => handleDragDelete(e)}>x</div>
            <div
                className={`content ${!props.item.underlineLinksIfPresent && classes['noLinkUnderline']}`}
                style={{...props.item.rootElementStyle, backgroundColor: getBgColor()}}
            >
                {activeItemId === props.item.id ? getActiveItem() : getPassiveItem()}
            </div>
        </div>
    );
};

export default Content;