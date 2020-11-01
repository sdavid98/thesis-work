import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import axios from "../../../axios";
import ListItem from "./ListItem";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';

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
    const [projectsInfo, updateProjectsInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const initProjectsList = () => {
        axios.get('/projects').then(res => {
            console.log(res);
            if (res.status === 200) {
                updateProjectsInfo(res.data);
                setIsLoading(false);
            }
        }).catch(err => {
            console.log(err);
        });
    };

    useEffect(() => {
        initProjectsList();
    }, []);

    if (isLoading) {
        return <div>Loading</div>;
    }

    return (
        <>
            <div className={classes.root}>
                {projectsInfo.map((project, index) => <ListItem key={index} project={project} />)}
            </div>
            <Fab className={classes.fab} onClick={navigateToNewProject} color="primary" aria-label="add">
                <AddIcon />
            </Fab>
        </>
    );
};

export default List;