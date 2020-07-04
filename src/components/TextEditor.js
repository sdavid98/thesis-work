import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {changeItemContent, makeDragHeightReCalculate} from "../actions";
import {Editor} from "@tinymce/tinymce-react";

const TextEditor = () => {
    const dispatch = useDispatch();
    const activeItemId = useSelector(state => state.activeItemId);
    const activeItem = useSelector(state => state.draggables).find(drag => drag.id === activeItemId);

    const handleChange = (content) => {
        dispatch(changeItemContent(activeItemId, content));
        dispatch(makeDragHeightReCalculate(true));
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
                toolbar:
                    'undo redo | bold italic underline | link | superscript subscript | fontselect fontsizeselect | forecolor backcolor | charmap | removeformat'
            }}
            onEditorChange={content => handleChange(content)}
        />
    );

};

export default TextEditor;