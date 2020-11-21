import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Popup from "../Popup";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {deleteComment} from "../../actions";
import {dateToLocalTimeString} from "../../utils/date";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

const Comment = () => {
    const dispatch = useDispatch();
    const comments = useSelector(state => state.comments.comments);
    const [open, updateOpen] = useState(false);
    const [activeComment, updateActiveComment] = useState({});

    const onCommentClick = (id) => {
        updateActiveComment(comments.find(comment => comment.id === id));
        updateOpen(true);
    };

    const onCommentDelete = (id) => {
        dispatch(deleteComment(id));
        updateOpen(false);
    };

    const getComments = () => {
        return comments.map(comment => (
            <div onClick={() => onCommentClick(comment.id)} key={comment.id}
                 style={{position: 'absolute', ...comment.position, border: '3px solid black', zIndex: 999}}>
                <InfoOutlinedIcon style={{float: 'right'}}/>
            </div>
        ));
    };

    return (
        <>
            {getComments()}
            <Popup open={open} modalCloser={() => updateOpen(false)}>
                <Typography color="textSecondary" gutterBottom>
                    {activeComment.commenter} - {dateToLocalTimeString(activeComment.time)}
                </Typography>
                <Typography variant="h6" component="h6">
                    {activeComment.content}
                </Typography>
                <Button variant="outlined" onClick={() => onCommentDelete(activeComment.id)} color="secondary"
                        size="small">Delete</Button>
            </Popup>
        </>
    )
};

export default Comment;