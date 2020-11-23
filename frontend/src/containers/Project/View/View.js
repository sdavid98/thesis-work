import React, {useCallback, useEffect, useState} from 'react';
import {
    openForEditItems,
    openForEditStructure,
    saveCommentsToStore,
    savedComment,
    toggleRegions
} from "../../../store/actions";
import {useParams} from "react-router-dom";
import axios from "../../../axios";
import Canvas from "../../Canvas/Canvas";
import {useDispatch, useSelector} from "react-redux";
import CommentArea from "../../../hoc/CommentArea";
import Comment from "../../Comment/Comment";
import Typography from "@material-ui/core/Typography";

const View = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const comments = useSelector(state => state.comments);
    const projectInfo = useSelector(state => state.items.projectInfo);
    const [isLoading, updateIsLoading] = useState(true);

    const initProjectView = useCallback((id) => {
        axios.get('/projects/view/' + id).then((res) => {
            if (res.data) {
                dispatch(openForEditItems(res.data.items));
                dispatch(openForEditStructure(res.data.structure));
                if (res.data.structure.showRegions) {
                    dispatch(toggleRegions());
                }
                updateIsLoading(false);

                axios.get('/projects/comment/' + id)
                    .then(res => {
                        dispatch(saveCommentsToStore(res.data.comments));
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        }).catch(err => {
            console.log(err);
        });
    }, [dispatch]);

    useEffect(() => {
        initProjectView(params.viewId);
    }, [params.viewId, initProjectView]);

    if (comments.shouldSave) {
        axios.post('/projects/comment/' + params.viewId, {payload: comments.comments})
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            });
        dispatch(savedComment());
    }


    if (isLoading) {
        return 'Loading...';
    }

    return (
        <>
            <Typography variant="h4" component="h4">
                {projectInfo.name}
            </Typography>
            <Typography variant="h5" component="h5">
                {projectInfo.preheader}
            </Typography>
            <CommentArea>
                <Canvas readOnly={true}/>
                <Comment/>
            </CommentArea>
        </>
    );
};

export default View;