import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {deleteRow, toggleRegions} from "../actions";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const useStyles = makeStyles(() => ({
    grid: {
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        gridGap: '30px',
        marginBottom: '30px'
    },
    label: {
        paddingTop: '30px',
        paddingBottom: '8px',
        fontSize: '1.2rem',
        color: '#505050',
        fontWeight: 'bold'
    },
    checkboxLabel: {
        fontSize: '0.9rem',
        marginLeft: 0,
        '& .MuiTypography-body1': {
            fontSize: '0.9rem',
        }
    },
}));


const RowActions = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const activeRowId = useSelector(state => state.structure.activeDataId);
    const showRegions = useSelector(state => state.structure.showRegions);

    if (!activeRowId) return false;

    return (
        <div>
            <div className={classes.label}>ROW SETTINGS</div>
            <div className={classes.grid}>
                <Button onClick={() => props.modalOpener(1)} size='medium' variant='contained' color='primary'>
                    Change structure
                </Button>
                <Button onClick={() => dispatch(deleteRow())} size='medium' variant="outlined" color='secondary'>
                    Delete row
                </Button>
            </div>
            <FormGroup row>
                <FormControlLabel
                    className={classes.checkboxLabel}
                    value='show'
                    control={
                        <Checkbox
                            onChange={(e) => dispatch(toggleRegions())}
                            color="primary"
                            checked={showRegions}
                        />
                    }
                    label='Show block regions'
                />
            </FormGroup>
        </div>
    );
};

export default RowActions;
