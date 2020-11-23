import React from "react";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import CancelIcon from "@material-ui/icons/Cancel";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    grid: {
        '&:hover': {
            backgroundColor: '#e6f2fd'
        },
        '& .MuiGrid-item': {
            alignSelf: 'center',
            padding: '2px 6px',
        }
    },
}));

const StructureDataRowItem = (props) => {
    const classes = useStyles();
    return (
        <Grid container className={classes.grid} onMouseEnter={() => props.handleMouseEnter(props.rowId)} onMouseLeave={props.handleMouseLeave}>
            <Grid item xs={8}>
                Row
            </Grid>
            <Grid item xs={3}>
                <Chip style={props.active ? {visibility: 'visible'} : {visibility: 'hidden'}} size="small" label="Column" variant="outlined" onClick={e => props.addColumn(props.rowId, props.colId)} icon={<AddCircleOutlineOutlinedIcon />} />
            </Grid>
            <Grid item xs={1}>
                <CancelIcon style={props.active ? {visibility: 'visible', cursor: 'pointer'} : {visibility: 'hidden'}} size="small" onClick={e => props.deleteRow(props.rowId)} />
            </Grid>
        </Grid>
    );
};

export default StructureDataRowItem;