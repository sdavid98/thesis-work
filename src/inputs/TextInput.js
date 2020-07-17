import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
    radios: {
        '& .MuiFormControlLabel-root': {
            flexBasis: '33%',
            marginLeft: 0,
            marginRight: 0
        }
    }
});

const TextInput = (props) => {
    const dispatch = useDispatch();
    const activeItemId = useSelector(state => state.activeItemId);
    const activeItem = useSelector(state => state.draggables).find(drag => drag.id === activeItemId);
    const getValue = () => {
        if (activeItemId) {
            return parseInt(props.value(activeItem.rootElementStyle[props.watch])) || 0;
        }
        return 0;
    };

    return (
        <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
                {props.text}
            </Grid>
            <Grid item>
                <TextField
                    id={props.text.replace(/ /g, "")}
                    value={getValue()}
                    onChange={(e) => dispatch(props.change(activeItem, props.text, e.target.value))}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">px</InputAdornment>,
                    }}
                />
            </Grid>
        </Grid>
    );
};

export default TextInput;