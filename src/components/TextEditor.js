import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {changeItemContent} from "../actions";
import {Editor} from "@tinymce/tinymce-react";

const TextEditor = (props) => {
    const dispatch = useDispatch();
    const activeItem = useSelector(state => state.activeItem);

    const handleChange = (content, b) => {

        dispatch(changeItemContent(activeItem.id, content));
        if (activeItem.type === 'list') {
            console.log(content, b);
            props.keyup(content);
        }
    };

    const basicEditor =
        <Editor
            value={activeItem.content.text}
            apiKey='w0kkvq8zy94j9ogzy10cs7o2xi40wnr7qlry107qay025qiz'
            init={{
                height: 500,
                inline: true,
                menubar: false,
                plugins: ['link charmap'],
                toolbar:
                    'undo redo | bold italic underline | link | superscript subscript | fontselect fontsizeselect | forecolor backcolor | charmap | removeformat'
            }}
            onEditorChange={content => handleChange(content)}
        />;

    const listEditor =
        <Editor
            value={activeItem.content.text}
            apiKey='w0kkvq8zy94j9ogzy10cs7o2xi40wnr7qlry107qay025qiz'
            init={{
                height: 500,
                inline: true,
                menubar: false,
                plugins: ['link charmap'],
                toolbar:
                    'undo redo | bold italic underline | link | superscript subscript | fontselect fontsizeselect | forecolor backcolor | charmap | removeformat'
            }}
            onEditorChange={(content, b) => handleChange(content, b)}
        />;

    if (activeItem.type === 'list') {
        return listEditor;
    }
    return basicEditor;

};

export default TextEditor;