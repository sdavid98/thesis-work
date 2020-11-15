import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Panel from "../../Panel";
import MenuItems from "../../MenuItems";
import BlockSettings from "../../BlockSettings";
import {
    changeActiveItemId,
    changePreheader,
    changeProjectName, clearItems, clearStructure,
    openForEditItems,
    openForEditStructure
} from "../../../actions";
import Popup from "../../Popup";
import StructureEditor from "../../StructureEditor";
import Canvas from "../../Canvas";
import RowActions from "../../RowActions";
import Button from "@material-ui/core/Button";
import Generator from "../../Generator";
import makeStyles from "@material-ui/core/styles/makeStyles";
import axios from "../../../axios";
import {useHistory, useParams} from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(() => ({
    wrapper: {
        padding: '20px 15px',
        display: 'grid',
        gridAutoFlow: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: 'solid 1px #cacaca;'
    },
    menu: {
        display: 'grid',
        gridAutoFlow: 'column',
        gridGap: 40,
        justifyContent: 'left',
        height: 36
    },
    label: {
        fontSize: '0.9rem',
        color: '#0000008a'
    },
    grid: {
        display: 'grid',
        gridAutoFlow: 'column',
        gridGap: 50,
        gridTemplateColumns: '200px 200px',
        marginBottom: 15
    }
}));

const Edit = () => {
    const params = useParams();
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const state = useSelector(state => state);
    const user = state.user;
    const canvasStyle = state.items.canvasStyle;
    const rowStyles = state.items.rowStyles;
    const structureData = state.structure.data;
    const contents = state.items.draggables;
    const [open, setOpen] = React.useState(false);
    const [projectNameText, updateProjectNameText] = useState('initialStateValue');
    const [preheaderText, updatepreheaderText] = useState('initialStateValue');
    const [isLoading, updateIsLoading] = useState(true);
    const [isNewProject, updateIsNewProject] = useState(true);

    const initProjectEdit = useCallback((id) => {
        axios.get('projects/' + id).then((res) => {
            console.log(res);
            dispatch(openForEditItems(res.data.items));
            dispatch(openForEditStructure(res.data.structure));
            updateIsLoading(false);
        }).catch(err => {
            console.log(err);
        });
    }, [dispatch]);

    useEffect(() => {
        if (params && params.projectId) {
            updateIsNewProject(false);
            initProjectEdit(params.projectId);
        }
        else {
            dispatch(clearStructure());
            dispatch(clearItems());
            updateIsLoading(false);
        }
    }, [params, dispatch, initProjectEdit]);

    const clickHandler = (e) => {
        if (e.target.className === 'ui') {
            dispatch(changeActiveItemId(null));
        }
    };

    const handleOpen = (num) => {
        setOpen(num);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getValue = (textInput, key) => {
        if (textInput !== 'initialStateValue') {
            return textInput;
        }
        return state.items.projectInfo[key];
    };

    const onProjectSave = () => {
        let apiEndPoint = 'projects/new';
        const payload = {
            mailData: {
                structure: state.structure,
                items: state.items
            },
            user: {
                name: user.name,
                group: user.group
            }
        };

        if (!isNewProject) {
            apiEndPoint = 'projects/' + params.projectId;
        }

        axios.post(apiEndPoint, {payload})
            .then(res => {
                console.log(res);
                if (res.data.projectId) {
                    history.push('/projects/' + res.data.projectId);
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    const keyup = (e, action) => {
        if (e.keyCode === 13) {
            dispatch(action(e.target.value));
        }
    };

    if (isLoading) {
        return 'Loading...';
    }

    return (
        <>
            <div className={classes.wrapper}>
                <div className={classes.grid}>
                    <div>
                        <Grid item className={classes.label}>
                            Project Name
                        </Grid>
                        <TextField
                            value={getValue(projectNameText, 'name')}
                            onChange={(e) => updateProjectNameText(e.target.value)}
                            InputProps={{
                                onKeyUp: (e) => keyup(e, changeProjectName)
                            }}
                        />
                    </div>
                    <div>
                        <Grid item className={classes.label}>
                            Email Preheader
                        </Grid>
                        <TextField
                            value={getValue(preheaderText, 'preheader')}
                            onChange={(e) => updatepreheaderText(e.target.value)}
                            InputProps={{
                                onKeyUp: (e) => keyup(e, changePreheader)
                            }}
                        />
                    </div>
                </div>
                <div className={classes.menu}>
                    <Button onClick={onProjectSave} variant='outlined' color='primary'>Save</Button>
                    <Button onClick={() => history.push('/projects')} variant='outlined' color='secondary'>Close</Button>
                    <Button onClick={() => Generator(structureData, contents, canvasStyle, rowStyles)}
                            color='primary' variant='contained'>Download</Button>
                </div>
            </div>
            <div className="App" style={{backgroundColor: canvasStyle.backColor}}>
                <div className="ui" onClick={clickHandler}>
                    <Panel>

                        <MenuItems modalOpener={handleOpen}/>
                        <RowActions modalOpener={handleOpen}/>
                        <BlockSettings rowSettings={true}/>
                    </Panel>
                    <Canvas/>
                    <Panel>
                        <BlockSettings rowSettings={false}/>
                    </Panel>
                </div>
                <Popup open={open === 1} modalCloser={handleClose}>
                    <StructureEditor/>
                </Popup>
            </div>
        </>
    );
};

export default Edit;
