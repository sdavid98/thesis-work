import React from 'react';
import {useSelector} from "react-redux";

const StructureBuild = (props) => {
    const activeStructureItem = useSelector(state => state.structure.activeDataId);
    const structureData = useSelector(state => state.structure.data);
    const style = {
        display: 'grid',
        gridTemplateColumns: props.columns.map(col => col.width+'px').join(' '),
    };

    return (
        <div key={props.index} style={{...style}}>
            {props.columns.map((col, index) => (
                <div key={index} style={{display: 'grid'}}>
                    {col.rows.map(colRow => (
                        props.rows.filter(row => row.id === colRow).map((row, index) => {
                            if (row.columns && row.columns.length > 0) {
                                return (
                                    <StructureBuild
                                        columns={structureData.find(data => data.id === activeStructureItem).columns.filter(col => row.columns.indexOf(col.id) >= 0)}
                                        rows={props.rows}
                                        index={index}
                                    />
                                )
                             }
                            return <div key={index} style={{border: 'black', boxShadow: 'inset 0 0 0 5px #4275d2', padding: '20px 5px', margin: '1px'}}></div>
                        })
                    ))}
                </div>
            ))}
        </div>
    );
};

export default StructureBuild;