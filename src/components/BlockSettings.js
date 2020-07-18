import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import ListItem from "./ListItem";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import {makeStyles} from "@material-ui/core/styles";
import {addNewListItem, changeListItems, makeDragHeightReCalculate} from "../actions";
import RadioButtonGroup from "../inputs/RadioButtonGroup";
import blockStyleConfig from "../blockStyleConfig";
import MultiLevelInputGroup from "./MultiLevelInputGroup";
import blockTypeConfig from "../blockTypeConfig";
import TextInput from "../inputs/TextInput";

const useStyles = makeStyles({
    styleBlock: {
        marginTop: '10px',
        marginBottom: '20px'
    },
    aloneLabel: {
        width: 'calc(50% - 20px)',
        '& .text-input-label': {
            fontSize: '0.9rem',
            color: '#0000008a',
            fontWeight: 400,
            lineHeight: 1
        }
    }
});

const BlockSettings = () => {
    const dispatch = useDispatch();
    const activeItemId = useSelector(state => state.activeItemId);
    const activeItem = useSelector(state => state.draggables).find(drag => drag.id === activeItemId);
    const classes = useStyles();

    const blockOptions = ['padding'];

    if (!activeItemId) {
        return <div></div>;
    }

    const optionItems = blockStyleConfig.filter(item => blockTypeConfig[activeItem.type].indexOf(item.id) >= 0).map(item => {
        if (item.type === 'radio' && item.childChange) {
            return <div className={classes.styleBlock}><MultiLevelInputGroup item={item} /></div>
        }
        if (item.type === 'radio') {
            return <div className={classes.styleBlock}><RadioButtonGroup item={item} /></div>
        }
        if (item.type === 'text') {
            return <div className={`${classes.styleBlock} ${classes.aloneLabel}`}><TextInput change={item.change} watch={item.id} value={item.value} text={item.label} /></div>
        }
    });


    return (
        <div>
            {optionItems}
        </div>
    );
};

export default BlockSettings;