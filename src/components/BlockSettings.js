import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import RadioButtonGroup from "../inputs/RadioButtonGroup";
import blockStyleConfig from "../blockStyleConfig";
import MultiLevelInputGroup from "./MultiLevelInputGroup";
import blockTypeConfig from "../blockTypeConfig";
import TextInput from "../inputs/TextInput";
import CheckboxGroup from "../inputs/CheckboxGroup";

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


    if (!activeItemId) {
        return <div></div>;
    }

    const optionItems = blockStyleConfig.filter(item => blockTypeConfig[activeItem.type].indexOf(item.id) >= 0).map((item, index) => {
        if (item.type === 'radio' && item.childChange) {
            return <div key={index} className={classes.styleBlock}><MultiLevelInputGroup item={item} /></div>
        }
        if (item.type === 'radio') {
            return <div key={index} className={classes.styleBlock}><RadioButtonGroup dispatchAction={true} change={item.change} item={item} /></div>
        }
        if (item.type === 'text') {
            return <div key={index} className={`${classes.styleBlock} ${classes.aloneLabel}`}><TextInput change={item.change} watch={item.id} value={item.value} text={item.label} /></div>
        }
        if (item.type === 'checkbox') {
            return <div key={index} className={classes.styleBlock}><CheckboxGroup item={item} /></div>
        }
        return false;
    });


    return (
        <div>
            {optionItems}
        </div>
    );
};

export default BlockSettings;