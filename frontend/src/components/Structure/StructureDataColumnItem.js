import React from "react";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import CancelIcon from "@material-ui/icons/Cancel";
import {makeStyles} from "@material-ui/core/styles";
import StructureTextInput from "../../containers/Inputs/StructureTextInput";

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

const StructureDataColumnItem = (props) => {
    const classes = useStyles();
    return (
        <Grid container className={classes.grid} onMouseEnter={() => props.handleMouseEnter(props.colId)} onMouseLeave={props.handleMouseLeave}>
            <Grid item xs={4}>
                Column
            </Grid>
            <Grid item xs={3} style={{textAlign: 'end'}}>
                width:
            </Grid>
            <Grid item xs={2}>
                <StructureTextInput colId={props.colId}/>
            </Grid>
            <Grid item xs={2}>
                <Chip style={props.active ? {visibility: 'visible'} : {visibility: 'hidden'}} size="small" label="Row" variant="outlined" onClick={e => props.addRow(props.colId)} icon={<AddCircleOutlineOutlinedIcon />} />
            </Grid>
            <Grid item xs={1}>
                <CancelIcon style={props.active ? {visibility: 'visible', cursor: 'pointer'} : {visibility: 'hidden'}} size="small" onClick={e => props.deleteColumn(props.colId)} />
            </Grid>
        </Grid>
    );
};

export default StructureDataColumnItem;