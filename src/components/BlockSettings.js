import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import ListItem from "./ListItem";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import {makeStyles} from "@material-ui/core/styles";
import {addNewListItem, changeListItems, makeDragHeightReCalculate} from "../actions";
import RadioButtonGroup from "../inputs/RadioButtonGroup";
import blockStyleConfig from "../blockStyleConfig";

const useStyles = makeStyles({
    icon: {
        height: 20,
        width: 20,
        minHeight: 20,
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)'
    },
    item: {
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        justifyContent: 'left'
    }
});

const BlockSettings = () => {
    const dispatch = useDispatch();
    const activeItemId = useSelector(state => state.activeItemId);
    const classes = useStyles();

    const blockOptions = ['padding'];

    const optionItems = blockStyleConfig.filter(item => blockOptions.indexOf(item.id) >= 0).map(item => {
       if (item.type === 'radio') {
           return <RadioButtonGroup item={item} />
       }
    });


    return (
        <div>
            {optionItems}
        </div>
    );
};

export default BlockSettings;