import React from "react";

const ImageContent = (props) => {

    return (
        <div>
            <img
                alt={props.item.content.imageAlt}
                src={props.item.content.imageSrc}
            />
        </div>
    );
};

export default ImageContent;