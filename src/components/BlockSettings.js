import React from "react";
import {useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import RadioButtonGroup from "../inputs/RadioButtonGroup";
import blockStyleConfig from "../blockStyleConfig";
import MultiLevelInputGroup from "./MultiLevelInputGroup";
import blockTypeConfig from "../blockTypeConfig";
import CheckboxGroup from "../inputs/CheckboxGroup";
import TextGroup from "../inputs/TextGroup";
import SelectGroup from "../inputs/SelectGroup";
import canvasOptions from "../canvasOptions";

const useStyles = makeStyles({
    styleBlock: {
        marginTop: '10px',
        marginBottom: '20px'
    }
});

const BlockSettings = () => {
    const activeItemId = useSelector(state => state.activeItemId);
    const activeItem = useSelector(state => state.draggables).find(drag => drag.id === activeItemId);
    const classes = useStyles();

    const generateInputs = (item, index) => {
        if (!item.condition || item.condition(activeItem)) {
            if (item.type === 'radio' && item.childChange) {
                return <div key={index} className={classes.styleBlock}><MultiLevelInputGroup item={item} /></div>
            }
            if (item.type === 'radio') {
                return <div key={index} className={classes.styleBlock}><RadioButtonGroup dispatchAction={true} change={item.change} item={item} /></div>
            }
            if (item.type === 'text') {
                return <div key={index} className={classes.styleBlock}><TextGroup item={item} /></div>
            }
            if (item.type === 'checkbox') {
                return <div key={index} className={classes.styleBlock}><CheckboxGroup item={item} /></div>
            }
            if (item.type === 'select') {
                return <div key={index} className={classes.styleBlock}><SelectGroup item={item} /></div>
            }
        }
        return false;
    };

    if (!activeItemId) {
        return canvasOptions.map((item, index) => generateInputs(item, index));
    }

    const optionItems = blockStyleConfig.filter(item => blockTypeConfig[activeItem.type].indexOf(item.id) >= 0).map((item, index) => generateInputs(item, index));

    return (
        <div>
            {optionItems}
        </div>
    );
};

export default BlockSettings;