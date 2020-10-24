import React from 'react';
import { useHistory } from "react-router-dom";
import ListItem from "./ListItem";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';

const data = [{
    "_id": "5f89a8305ea85022103643fe",
    "created_at": "2020-10-16 11:11",
    "created_by": "John",
    "name": "ASD Project DE_2020_2"
}, {
    "_id": "5f89a8335ea85022103643ff",
    "created_at": "2020-10-16 11:11",
    "created_by": "John",
    "name": "ASD Project DE_2020_2"
}, {
    "_id": "5f89a83a5ea8502210364400",
    "created_at": "2020-10-16 11:11",
    "created_by": "John",
    "name": "ASD Project DE_2020_2"
}, {
    "_id": "5f89a86c0fe3890e20c43ae8",
    "created_at": "2020-10-16 11:11",
    "created_by": "John",
    "name": "ASD Project DE_2020_2"
}, {
    "_id": "5f89a86e0fe3890e20c43ae9",
    "created_at": "2020-10-16 11:11",
    "created_by": "John",
    "name": "ASD Project DE_2020_2"
}, {
    "_id": "5f89a8730fe3890e20c43aea",
    "created_at": "2020-10-16 11:11",
    "created_by": "John",
    "name": "ASD Project DE_2020_2"
}, {
    "_id": "5f89a8750fe3890e20c43aeb",
    "created_at": "2020-10-16 11:11",
    "created_by": "John",
    "name": "ASD Project DE_2020_2"
}, {
    "_id": "5f89a8780fe3890e20c43aec",
    "created_at": "2020-10-16 11:11",
    "created_by": "John",
    "name": "ASD Project DE_2020_2"
}];

const useStyles = makeStyles({
    root: {
        maxWidth: 640,
        margin: '0 auto'
    },
    fab: {
        position: 'fixed',
        bottom: 50,
        right: 50,
    },
});

const List = () => {
    const classes = useStyles();
    const history = useHistory();
    const navigateToNewProject = () => history.push('/projects/new');

    return (
        <>
            <div className={classes.root}>
                {data.map((project, index) => <ListItem key={index} project={project} />)}
            </div>
            <Fab className={classes.fab} onClick={navigateToNewProject} color="primary" aria-label="add">
                <AddIcon />
            </Fab>
        </>
    );
};

export default List;