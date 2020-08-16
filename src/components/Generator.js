import {useSelector} from "react-redux";

const create = (columns, rows, dataId, structureData) => {
    let result = '';
    result += "<table cellspacing='0' cellpadding='0' border='0'><tr>";
    columns.map((col) => {
        result += "<td valign='top'><table cellspacing='0' cellpadding='3' border='1px'>";
        col.rows.map(colRow => {
            return rows.filter(row => row.id === colRow).map((row, index) => {
                result += "<tr><td valign='top'>";
                if (row.columns && row.columns.length > 0) {
                    result += create(structureData.find(data => data.id === dataId).columns.filter(col => row.columns.indexOf(col.id) >= 0), rows, dataId, structureData);
                }
                else {
                    result += `<div>${row.content}</div>`;
                }
                result += "</td></tr>";
                return result;
            })
        });
        result += "</table></td>";
    });
    result += "</tr></table>";
    return result;
};

const Generator = (props) => {
    const structureData = useSelector(state => state.structure.data);

    return create(props.columns, props.rows, props.dataId, structureData);

};

export default Generator;