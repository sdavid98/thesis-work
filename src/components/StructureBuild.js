import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import ContentTypeSelect from "../inputs/ContentTypeSelect";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Content from "./Content";

const useStyles = makeStyles(() => ({
    showRegionsOnCanvas: {
        border: '1px solid #4275d2',
    },
    showRegionsOnEditor: {
        boxShadow: 'inset 0 0 0 5px #4275d2',
        margin: '1px'
    },
    placeHolder: {
        padding: '20px 5px'
    }
}));

const StructureBuild = (props) => {
    const classes = useStyles();
    const contentItems = useSelector(state => state.items.draggables);
    const showRegions = useSelector(state => state.structure.showRegions);
    const structureData = useSelector(state => state.structure.data);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openId, setOpenId] = useState(null);
    const style = {
        display: 'grid',
        gridTemplateColumns: props.columns.map(col => col.width+'px').join(' '),
    };

    const handlePopoverOpen = (event, dataId, rowId) => {
        setOpenId(`${dataId}-${rowId}`);
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setOpenId(null);
        setAnchorEl(null);
    };

    const getContent = (contentId, rowId) => {
        if (props.isOnCanvas && contentId && contentItems.find(item => item.id === contentId)) {
            return <Content item={contentItems.find(item => item.id === contentId)} />
        }
        if (props.isOnCanvas && props.active) {
            return (
                <div style={{display: 'grid', justifyContent: 'center'}}>
                    <IconButton edge="end" aria-label="add" onClick={(e) => handlePopoverOpen(e, props.dataId, rowId)}>
                        <AddCircleOutlineOutlinedIcon />
                    </IconButton>
                    <Popover
                        open={openId === `${props.dataId}-${rowId}`}
                        anchorEl={anchorEl}
                        onClose={handlePopoverClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <ContentTypeSelect rowId={rowId} closePopup={handlePopoverClose} />
                    </Popover>
                </div>
            )
        }
        return <div className={classes.placeHolder}></div>
    };

    return (
        <div key={props.index} style={{...style}}>
            {props.columns.map((col, index) => (
                <div key={index} style={{display: 'grid', height: 'fit-content'}}>
                    {col.rows.map(colRow => (
                        props.rows.filter(row => row.id === colRow).map((row, index) => {
                            if (row.columns && row.columns.length > 0) {
                                return (
                                    <StructureBuild
                                        key={index}
                                        columns={structureData.find(data => data.id === props.dataId).columns.filter(col => row.columns.indexOf(col.id) >= 0)}
                                        rows={props.rows}
                                        index={index}
                                        isOnCanvas={props.isOnCanvas}
                                        active={props.active}
                                        dataId={props.dataId}
                                    />
                                )
                             }
                            return <div key={index} className={(props.active && showRegions) ? (props.isOnCanvas ? classes.showRegionsOnCanvas : classes.showRegionsOnEditor) : ''}>{getContent(row.content, row.id)}</div>
                        })
                    ))}
                </div>
            ))}
        </div>
    );
};

export default StructureBuild;