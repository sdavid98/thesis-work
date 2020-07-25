import React from "react";
import {useSelector} from "react-redux";
import {Editor} from "@tinymce/tinymce-react";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Fab from "@material-ui/core/Fab";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    icon: {
        height: 20,
        width: 20,
        minHeight: 20,
        position: 'absolute',
        right: -20,
    }
});

const ListItem = (props) => {
    const activeItemId = useSelector(state => state.activeItemId);
    const classes = useStyles();

    const editor =
        <Editor
        value={props.text}
        apiKey='w0kkvq8zy94j9ogzy10cs7o2xi40wnr7qlry107qay025qiz'
        init={{
            height: 500,
            inline: true,
            menubar: false,
            plugins: ['link charmap'],
            toolbar:
                'undo redo | bold italic underline | link | superscript subscript | fontselect fontsizeselect | forecolor backcolor | charmap | removeformat'
        }}
        onEditorChange={content => props.change(props.index, content)}
    />;

    const content = () => {
        if (props.activeListItemNum === props.index) {
            return editor;
        }
        return <div dangerouslySetInnerHTML={{__html: props.text}}></div>;
    };

    const deleteButton = () => {
        if (props.activeListItemNum === props.index && props.blokkId === activeItemId && props.itemNum > 1) {
            return (
                <Fab
                    className={classes.icon}
                    color="primary"
                    aria-label="delete"
                    onClick={() => props.delete(props.index)}
                >
                    <HighlightOffIcon/>
                </Fab>
            );
        }
    };

    return (
        <div onClick={() => props.click(props.index)}>
            {deleteButton()}
            {content()}
        </div>
    );
};

export default ListItem;