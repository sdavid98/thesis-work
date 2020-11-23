import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {changeItemContent} from "../../store/actions";
import {Editor} from "@tinymce/tinymce-react";

const TextEditor = (props) => {
    const dispatch = useDispatch();
    const activeItemId = useSelector(state => state.items.activeItemId);
    const activeItem = useSelector(state => state.items.draggables).find(drag => drag.id === activeItemId);
    const textToolbar = 'undo redo | bold italic underline | link | superscript subscript | fontselect | forecolor backcolor | charmap | removeformat';
    const buttonToolbar = 'undo redo | bold italic underline | superscript subscript | fontselect | forecolor backcolor | charmap | removeformat';

    const onChange = (content) => {
        if (props.change) {
            props.change(content);
        }
        else {
            dispatch(changeItemContent(activeItemId, content));
        }
    };

    return (
        <Editor
            value={activeItem.content.text}
            apiKey='w0kkvq8zy94j9ogzy10cs7o2xi40wnr7qlry107qay025qiz'
            init={{
                height: 500,
                inline: true,
                menubar: false,
                plugins: ['link charmap'],
                toolbar: activeItem.type === 'button' ? buttonToolbar : textToolbar,
            }}
            onEditorChange={onChange}
        />
    );

};

export default TextEditor;