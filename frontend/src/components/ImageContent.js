import React from "react";

const ImageContent = (props) => {
    const wrapWithLink = elem => <a target='_blank' rel='noopener noreferrer' href={props.item.content.link}>{elem}</a>;
    const image = <img
        alt={props.item.content.imageAlt}
        src={props.item.content.imageSrc}
    />;

    return (
        <div>
            {props.item.content.link ? wrapWithLink(image) : image}
        </div>
    );
};

export default ImageContent;