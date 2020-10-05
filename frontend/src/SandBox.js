import React, { useState } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


const rows = [
    {
        id: 'row1',
        type: 'main',
        children: ['col1', 'col2'],
        contentId: false
    },
    {
        id: 'row2',
        type: 'main',
        children: ['col3', 'col4', 'col5'],
        contentId: false
    },
    {
        id: 'row3',
        type: 'inner',
        children: [],
        contentId: 'con1'
    },
    {
        id: 'row4',
        type: 'inner',
        children: [],
        contentId: 'con2'
    },
    {
        id: 'row5',
        type: 'inner',
        children: [],
        contentId: 'con3'
    },
    {
        id: 'row6',
        children: [],
        contentId: 'con4'
    },
    {
        id: 'row7',
        type: 'inner',
        children: [],
        contentId: 'con5'
    },
    {
        id: 'row8',
        type: 'inner',
        children: [],
        contentId: 'con6'
    },
    {
        id: 'row9',
        type: 'inner',
        children: [],
        contentId: 'con7'
    }
];

const colums = [
    {
        id: 'col1',
        width: '40%',
        children: ['row3', 'row4']
    },
    {
        id: 'col2',
        width: '60%',
        children: ['row5']
    },
    {
        id: 'col3',
        width: '30%',
        children: ['row6']
    },
    {
        id: 'col4',
        width: '40%',
        children: ['row7', 'row8']
    },
    {
        id: 'col5',
        width: '30%',
        children: ['row9']
    }
];

const content = [
    {
        id: 'con1',
        content: 'Content1'
    },
    {
        id: 'con2',
        content: 'Content2'
    },
    {
        id: 'con3',
        content: 'Content3'
    },
    {
        id: 'con4',
        content: 'Content4'
    },
    {
        id: 'con5',
        content: 'Content5'
    },
    {
        id: 'con6',
        content: 'Content6'
    },
    {
        id: 'con7',
        content: 'Content7'
    }
];

const renderItem = (item, index) => (
    <Draggable key={index} draggableId={item.id} index={index}>
        {(provided, snapshot) => (
            <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
            >{item.content}</div>
        )}
    </Draggable>
);

const renderDnD = (renderDndLowerLevel, row, index) => (
    <Droppable droppableId={`${index}`} type={row.type} key={row.id}>
        {(dropProvided, dropSnapshot) => (
            <div
                ref={dropProvided.innerRef}
                {...dropProvided.droppableProps}
                style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}
            >

                {row.children.length > 0 ? colums.filter(col => row.children.indexOf(col.id) >= 0).map((col, index) => (
                    <Draggable draggableId={col.id} key={col.id} index={index}>
                        {(dragProvided, dragSnapshot) => (
                            <div
                                ref={dragProvided.innerRef}
                                {...dragProvided.draggableProps}
                                {...dragProvided.dragHandleProps}
                            >{console.log(rows.filter(row => col.children.indexOf(row.id) >= 0))}
                                {rows.filter(row => col.children.indexOf(row.id) >= 0).map(
                                    (innerRow, index) => innerRow.children.length > 0 ? renderDndLowerLevel(renderDndLowerLevel, innerRow, index) : renderItem(content.find(con => con.id === innerRow.contentId), index)
                                )}
                            </div>
                        )}
                    </Draggable>
                )) : renderItem(content.find(con => con.id === row.contentId), index)}
                {dropProvided.placeholder}
            </div>
        )}
    </Droppable>
);

// fake data generator
const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    content: `item ${k + offset}`
  }));

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    console.log(source, destination, droppableSource, droppableDestination);
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};
const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle
});
const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
});

const SandBox = () => {
    const [state, setState] = useState([getItems(3), getItems(2, 3)]);

    return (
        <div></div>
    );
};


export default SandBox;
