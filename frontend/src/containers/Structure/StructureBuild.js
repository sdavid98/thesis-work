import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import ContentTypeSelect from "../Inputs/ContentTypeSelect";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Content from "../Content/Content";

const useStyles = makeStyles(() => ({
    showRegionsOnCanvas: {
        border: '1px solid #4275d2',
    },
    showRegionsOnEditor: {
        boxShadow: 'inset 0 0 0 5px #4275d2',
        margin: '1px'
    },
    placeHolder: {
        padding: '20px 5px',
    }
}));

const StructureBuild = React.forwardRef((props, ref) => {
    const classes = useStyles();
    const {draggables: contentItems, canvasStyle} = useSelector(state => state.items);
    const showRegions = useSelector(state => state.structure.showRegions);
    const {structureData, viewMode, isMobileViewChanged} = useSelector(state => state.structure);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openId, setOpenId] = useState(null);
    const style = {
        display: 'grid',
        gridTemplateColumns: props.columns.map(col => {
            if (viewMode === 'mobile' && !isMobileViewChanged) {
                return Math.floor(+col.width * parseInt(canvasStyle.widthMobile) / parseInt(canvasStyle.width)) + 'px';
            }
            return col.width + 'px'
        }).join(' '),
    };

    const handlePopoverOpen = (event, dataId, rowId) => {
        setOpenId(`${dataId}-${rowId}`);
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setOpenId(null);
        setAnchorEl(null);
    };

    const getContentTypeSelect = (rowId) => (
        <div style={{display: 'grid', justifyContent: 'center'}}>
            <IconButton edge="end" aria-label="add" onClick={(e) => handlePopoverOpen(e, props.dataId, rowId)}>
                <AddCircleOutlineOutlinedIcon/>
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
                <ContentTypeSelect dataId={props.dataId} rowId={rowId} closePopup={handlePopoverClose}/>
            </Popover>
        </div>
    );

    const getContent = (contentId, rowId) => {
        if (props.isOnCanvas && contentId && contentItems.find(item => item.id === contentId)) {
            return <Content readOnly={props.readOnly || false} item={contentItems.find(item => item.id === contentId)}/>
        }
        if (ref && !props.readOnly) {
            const dataId = props.dataId;
            //const elementRef = ref.current.find(el => el.rowId === rowId && el.dataId === dataId);
            //const index = elementRef ? ref.current.indexOf(elementRef) : ref.current.length;
            return (
                <div ref={element => (ref.current.push({element, rowId, dataId}))}>
                    {getContentTypeSelect(rowId)}
                </div>);
        }
        if (props.isOnCanvas && props.active && !props.readOnly) {
            return getContentTypeSelect(rowId);
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
                                        ref={ref}
                                    />
                                )
                            }
                            return <div key={index}
                                        className={(props.active && showRegions) ? (props.isOnCanvas ? classes.showRegionsOnCanvas : classes.showRegionsOnEditor) : ''}>{getContent(row.content, row.id)}</div>
                        })
                    ))}
                </div>
            ))}
        </div>
    );
});

export default StructureBuild;