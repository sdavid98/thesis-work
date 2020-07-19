import React from "react";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    group: {
        margin: '10px 0'
    },
    label: {
        fontSize: '0.9rem',
        color: '#0000008a',
        '&.Mui-focused': {
            color: '#0000008a'
        }
    },
    radios: {
        '& .MuiFormControlLabel-root': {
            flexBasis: '33%',
            marginLeft: 0,
            marginRight: 0
        },
        '& .MuiTypography-body1': {
            fontSize: '0.9rem'
        }
    }
});

const RadioButtonGroup = (props) => {
    const classes = useStyles();

    const options = props.item.items.map((item, index) => {
       return <FormControlLabel key={index} value={item.text.replace(/ /g, "")} control={<Radio color="primary" />} label={item.text} />
    });

    const handleChange = (event) => {
        props.change(event.target.value);
    };

    return (
        <FormControl className={classes.group} component="fieldset">
            <FormLabel className={classes.label} component="legend">{props.item.label}</FormLabel>
            <RadioGroup onChange={handleChange} className={classes.radios} row name={props.item.id} defaultValue={props.item.items[0].text.replace(/ /g, "")}>
                {options}
            </RadioGroup>
        </FormControl>
    );
};

export default RadioButtonGroup;