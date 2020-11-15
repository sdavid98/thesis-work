import React, {useCallback, useEffect, useRef, useState} from 'react';
import {openForEditItems, openForEditStructure, toggleRegions} from "../../../actions";
import {useParams} from "react-router-dom";
import axios from "../../../axios";
import Canvas from "../../Canvas";
import {useDispatch} from "react-redux";

const View = () => {
    const params = useParams();
    const ref = useRef();
    const dispatch = useDispatch();
    const [isLoading, updateIsLoading] = useState(true);
    const [backColor, updateBackColor] = useState('ffffff');
    const [isMakingComment, updateIsMakingComment] = useState(false);
    const [canMakeComment, updateCanMakeComment] = useState(false);
    const [canvasWidth, updateCanvasWidth] = useState(600);
    const startTop = 50;
    const startLeft = parseInt((window.innerWidth - canvasWidth) / 2);

    const initProjectEdit = useCallback((id) => {
        axios.get('projects/view/' + id).then((res) => {
            if (res.data) {
                dispatch(openForEditItems(res.data.items));
                dispatch(openForEditStructure(res.data.structure));
                if (res.data.structure.showRegions) {
                    dispatch(toggleRegions());
                }
                updateBackColor(res.data.items.canvasStyle.backColor);
                updateCanvasWidth(parseInt(res.data.items.canvasStyle.width));
                updateIsLoading(false);
            }
        }).catch(err => {
            console.log(err);
        });
    }, [dispatch]);

    useEffect(() => {
        initProjectEdit(params.viewId);
    }, [params.viewId, initProjectEdit]);


    if (isLoading) {
        return 'Loading...';
    }

    const onCommentDrawStart = (e) => {
        if (canMakeComment) {
            ref.current.style.width = 0 + 'px';
            ref.current.style.height = 0 + 'px';
            updateIsMakingComment(true);
            ref.current.style.left = e.pageX - startLeft + 'px';
            ref.current.style.top = e.pageY + 'px';
        }
    };

    const onCommentDraw = (e) => {
        if (isMakingComment) {
            ref.current.style.width = parseInt(e.pageX) - parseInt(ref.current.style.left) - startLeft + 'px';
            ref.current.style.height = parseInt(e.pageY) - parseInt(ref.current.style.top) + 'px';
        }
    };

    const onCommentDrawEnd = (e) => {
        updateIsMakingComment(false);
        updateCanMakeComment(false);
    };

    return (
        <>
            <button onClick={() => updateCanMakeComment(true)}>New Comment</button>
            <div onMouseDown={onCommentDrawStart} onMouseMove={onCommentDraw} onMouseUp={onCommentDrawEnd} style={{minHeight: '100vh', backgroundColor: backColor, display: 'grid'}}>
                <div style={{position: 'absolute', top: 0, left: startLeft}}>
                    <Canvas readOnly={true}/>
                    <div style={{position: 'absolute', border: '3px solid black'}} ref={ref}></div>
                </div>
            </div>
        </>
    );
};

export default View;