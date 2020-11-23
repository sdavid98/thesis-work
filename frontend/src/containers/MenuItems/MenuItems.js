import React from "react";
import List from "@material-ui/core/List";
import ListItem from '@material-ui/core/ListItem';
import {
    createStructure,
    initRowStyle
} from "../../store/actions";
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    grid: {
        cursor: 'pointer',
        display: 'grid',
        '&:hover': {
            boxShadow: '0px 0px 10px #3f51b5',
            '& .hover-text': {
                display: 'block'
            }
        }
    },
    text: {
        display: 'none',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        fontWeight: 'bold',
        textShadow: '0px 0px 25px #3f51b5',
        padding: '5px 20px',
        backgroundColor: '#4275d2',
        color: '#ffffff',
        fontSize: '1.2rem',
        borderRadius: '5px',
        boxShadow: '2px 2px 8px black'
    },
    label: {
        fontSize: '1.2rem',
        color: '#505050',
        fontWeight: 'bold'
    },
    col: {
        boxShadow: 'inset 0 0 0 5px #4275d2',
        margin: '1px',
        padding: '25px 0',
        textAlign: 'center',
        fontWeight: 'bold'
    }
}));

const MenuItems = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const canvasWidth = parseInt(useSelector(state => state.items.canvasStyle.width));

    const onCreateStructureClick = (type) => {
        const newId = Date.now().toString().substr(-8).split('').map(s => String.fromCharCode(Number(s)+65)).join('');
        dispatch(initRowStyle(newId));

        let colWidth = canvasWidth;
        if (type !== 'custom') {
            colWidth = Math.floor(colWidth / type);
        }

        dispatch(createStructure(newId, type, colWidth));

        if (type === 'custom') {
            props.modalOpener(1);
        }
    };

    const getCols = num => {
        let result = [];
        for (let i = 0; i < num; i++) {
            result.push(<div key={i} className={classes.col} />);
        }
        return result;
    };

    return (
        <List>
            <div className={classes.label}>ADD NEW</div>
            {[1, 2, 3, 4].map((item, index) => (
                    <ListItem key={index} disableGutters={true} classes={{container: "list-item"}}>
                        <div style={{gridTemplateColumns: `repeat(${item}, 1fr) auto`, width: '100%'}} onClick={() => onCreateStructureClick(item)} className={classes.grid}>
                            {getCols(item)}
                            <div className={`${classes.text} hover-text`}>ADD</div>
                        </div>
                    </ListItem>
                )
            )}
            <ListItem disableGutters={true} classes={{container: "list-item"}}>
                <div style={{display: 'grid', width: '100%'}} onClick={() => onCreateStructureClick('custom')} className={classes.grid}>
                    <div className={classes.col} style={{padding: '16px 0'}}>CUSTOM</div>
                    <div className={`${classes.text} hover-text`}>ADD</div>
                </div>
            </ListItem>

        </List>
    )
};

export default MenuItems;