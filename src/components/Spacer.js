import React from "react";

const Spacer = (props) => {
    return (
        <div>
            <div style={{
                ...props.item.rootElementStyle
            }}></div>
        </div>
    );
};

export default Spacer;