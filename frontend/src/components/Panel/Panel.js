import React from "react";

const Panel = props => {

    return (
        <div className="panel">
            {props.children}
        </div>
    )
};

export default Panel;