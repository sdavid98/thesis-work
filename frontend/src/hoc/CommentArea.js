import React, {useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Popup from "../components/Popup";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {addComment} from "../actions";

const CommentArea = (props) => {
    const ref = useRef();
    const dispatch = useDispatch();
    const canvasWidth = useSelector(state => parseInt(state.items.canvasStyle.width)) || 600;
    const backColor = useSelector(state => state.items.canvasStyle.backColor) || '#ffffff';
    const [commenterName, updateCommenterName] = useState('');
    const [isNameSaved, updateIsNameSaved] = useState(false);
    const [comment, updateComment] = useState('');
    const [open, updateOpen] = useState(false);
    const [isMakingComment, updateIsMakingComment] = useState(false);
    const [canMakeComment, updateCanMakeComment] = useState(false);
    const [topOfRectangle, updateTopOfRectangle] = useState(0);
    const startLeft = Math.floor((window.innerWidth - canvasWidth) / 2);

    const onCommentDrawStart = (e) => {
        if (canMakeComment) {
            ref.current.style.left = '0px';
            ref.current.style.top = '0px';
            ref.current.style.width = '0px';
            ref.current.style.height = '0px';
            const {top} = ref.current.getBoundingClientRect();
            updateTopOfRectangle(top);
            ref.current.style.left = e.pageX - startLeft + 'px';
            ref.current.style.top = e.pageY - top + 'px';
            ref.current.style.border = '3px solid black';
            updateIsMakingComment(true);
        }
    };

    const onCommentDraw = (e) => {
        if (isMakingComment) {
            ref.current.style.width = parseInt(e.pageX) - parseInt(ref.current.style.left) - startLeft + 'px';
            ref.current.style.height = parseInt(e.pageY) -topOfRectangle- parseInt(ref.current.style.top) + 'px';
        }
    };

    const onCommentDrawEnd = (e) => {
        if (isMakingComment) {
            updateIsMakingComment(false);
            updateCanMakeComment(false);
            updateOpen(true);
            ref.current.style.border = 'none';
        }
    };

    const initNewComment = () => {
        if (isNameSaved) {
            updateCanMakeComment(true);
        } else {
            updateOpen(true);
        }
    };

    const onCancelCommenting = () => {
        updateOpen(false);
        updateComment('');
    };

    const onSaveComment = async () => {
        if (comment !== '') {
            updateOpen(false);
            const {top, left, width, height} = ref.current.style;
            const position = {
                top, left, width, height
            };
            dispatch(addComment(comment, commenterName, Date.now(), position));
        }
    };

    const onSaveName = () => {
        updateOpen(false);
        updateIsNameSaved(true);
        updateCanMakeComment(true);
    };

    return (
        <div>
            <button onClick={initNewComment}>New Comment</button>
            <div onMouseDown={onCommentDrawStart} onMouseMove={onCommentDraw} onMouseUp={onCommentDrawEnd}
                 style={{minHeight: '100vh', backgroundColor: backColor, display: 'grid'}}>
                <div style={{position: 'absolute', left: startLeft}}>
                    <div style={{position: 'absolute', zIndex: 999}} ref={ref}/>
                    {props.children}
                </div>
            </div>
            <Popup open={open} modalCloser={() => updateOpen(false)}>
                {isNameSaved ?
                    (<Grid container spacing={4} justify="center" alignItems="baseline">
                        <Grid item>
                            <TextField
                                label="Comment"
                                variant="outlined"
                                value={comment}
                                onChange={(e) => updateComment(e.target.value)}
                            />
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" color="primary" onClick={onSaveComment}>SAVE</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" color="secondary" onClick={onCancelCommenting}>Cancel</Button>
                        </Grid>
                    </Grid>)
                    :
                    (<Grid container spacing={4} justify="center" alignItems="center">
                        <Grid item>
                            <TextField
                                label="Commenter's Name"
                                variant="outlined"
                                value={commenterName}
                                onChange={(e) => updateCommenterName(e.target.value)}
                            />
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" color="primary" onClick={onSaveName}>OK</Button>
                        </Grid>
                    </Grid>)
                }
            </Popup>
        </div>
    );
};

export default CommentArea;