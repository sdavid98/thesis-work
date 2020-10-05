import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import TextInput from "./TextInput";

const useStyles = makeStyles({
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 2fr)',
        gridColumnGap: '40px',
        gridRowGap: '10px'
    },
    label: {
        fontSize: '0.9rem',
        color: '#0000008a'
    }
});

const TextGroup = (props) => {
    const classes = useStyles();

    const mapInputGroup = () => {
        if (props.item.items) {
            return props.item.items.map((item, index) => <TextInput key={index} item={item} change={props.item.change} />);
        }
        return <TextInput item={props.item} change={props.item.change} />;
    };

    return (
        <>
            <FormLabel className={classes.label} component="legend">{props.item.label}</FormLabel>
            <FormGroup row className={classes.grid}>
                {mapInputGroup()}
            </FormGroup>
        </>
    );
};

export default TextGroup;