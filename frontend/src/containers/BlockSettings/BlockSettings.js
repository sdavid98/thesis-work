import React from "react";
import {useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import RadioButtonGroup from "../Inputs/RadioButtonGroup";
import blockStyleConfig from "../../store/editorConfigs/blockStyleConfig";
import MultiLevelInputGroup from "../Inputs/MultiLevelInputGroup";
import blockTypeConfig from "../../store/editorConfigs/blockTypeConfig";
import CheckboxGroup from "../Inputs/CheckboxGroup";
import TextGroup from "../../components/Inputs/TextGroup";
import SelectGroup from "../Inputs/SelectGroup";
import canvasOptions from "../../store/editorConfigs/canvasOptions";
import rowOptions from "../../store/editorConfigs/rowOptions";

const useStyles = makeStyles({
    styleBlock: {
        marginTop: '10px',
        marginBottom: '20px'
    },
    label: {
        fontSize: '1.2rem',
        color: '#505050',
        fontWeight: 'bold',
        paddingTop: '8px'
    },
});

const BlockSettings = (props) => {
    const activeItemId = useSelector(state => state.items.activeItemId);
    const activeItem = useSelector(state => state.items.draggables).find(drag => drag.id === activeItemId);
    const {activeDataId, viewMode} = useSelector(state => state.structure);
    const classes = useStyles();

    const generateInputs = (item, index) => {
        if (!item.condition || item.condition(activeItem) || item.condition(viewMode)) {
            if (item.type === 'radio' && item.childChange) {
                return <div key={index} className={classes.styleBlock}><MultiLevelInputGroup
                    rowSetting={props.rowSettings} item={item}/></div>
            }
            if (item.type === 'radio') {
                return <div key={index} className={classes.styleBlock}><RadioButtonGroup rowSetting={props.rowSettings}
                                                                                         dispatchAction={true}
                                                                                         change={item.change}
                                                                                         item={item}/></div>
            }
            if (item.type === 'text') {
                return <div key={index} className={classes.styleBlock}><TextGroup rowSetting={props.rowSettings}
                                                                                  item={item}/></div>
            }
            if (item.type === 'checkbox') {
                return <div key={index} className={classes.styleBlock}><CheckboxGroup rowSetting={props.rowSettings}
                                                                                      item={item}/></div>
            }
            if (item.type === 'select') {
                return <div key={index} className={classes.styleBlock}><SelectGroup item={item}/></div>
            }
        }
        return false;
    };

    if (props.rowSettings) {
        return activeDataId ? rowOptions.map((item, index) => generateInputs(item, index)) : false;
    }

    if (!activeItemId) {
        return (
            <>
                <div className={classes.label}>CANVAS SETTINGS</div>
                {canvasOptions.map((item, index) => generateInputs(item, index))}
            </>
        );
    }

    const optionItems = blockStyleConfig.filter(item => blockTypeConfig[activeItem.type].indexOf(item.id) >= 0).map((item, index) => generateInputs(item, index));

    return (
        <div>
            <div className={classes.label}>CONTENT BLOCK SETTINGS</div>
            {optionItems}
        </div>
    );
};

export default BlockSettings;