/*
import React, {Component, useState} from 'react';
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";


const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const reorderQuoteMap = ({quoteMap, source, destination,}) => {
    const current = [...quoteMap[source.droppableId]];
    const next = [...quoteMap[destination.droppableId]];
    const target = current[source.index];

    // moving to same list
    if (source.droppableId === destination.droppableId) {
        const reordered = reorder(
            current,
            source.index,
            destination.index,
        );
        const result = {
            ...quoteMap,
            [source.droppableId]: reordered,
        };
        return {
            quoteMap: result,
        };
    }

    // moving to different list

    // remove from original
    current.splice(source.index, 1);
    // insert into next
    next.splice(destination.index, 0, target);

    const result = {
        ...quoteMap,
        [source.droppableId]: current,
        [destination.droppableId]: next,
    };

    return {
        quoteMap: result,
    };
};

const Column = props => {
    const title = props.title;
    const quotes = props.quotes;
    const index = props.index;

    return (
        <Draggable draggableId={title} index={index}>
            {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.draggableProps}>
                    <div>
                        <div
                            {...provided.dragHandleProps}
                            aria-label={`${title} quote list`}
                        >
                            {title}
                        </div>
                    </div>
                    <Droppable droppableId={`${index}`}>
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)'}}
                            >
                                {quotes.map((item, ind) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={ind}
                                    >
                                        {provided => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={{border: '1px solid blue', padding: '15px'}}
                                            >
                                                {item.content}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                            </div>
                        )}
                    </Droppable>
                </div>
            )}
        </Draggable>
    );

};

const data = [

        [
            {
                id: '10',
                content: 'I should not have drunk that much tea!',
                author: 'princess',
            },
            {
                id: '11',
                content: 'Please! I need the real you!',
                author: 'princess',
            },
            {
                id: '12',
                content: "Haven't slept for a solid 83 hours, but, yeah, I'm good.",
                author: 'princess',
            },
        ],
        [
            {
                id: '13',
                content: 'have drunk that much tea!',
                author: 'princess',
            },
            {
                id: '14',
                content: 'Please!the real you!',
                author: 'princess',
            },
            {
                id: '15',
                content: "Haven'id 83 hours, but, yeah, I'm good.",
                author: 'princess',
            },
        ],
        [
            {
                id: '16',
                content: 'I should that much tea!',
                author: 'princess',
            },
            {
                id: '17',
                content: 'Please! I need ou!',
                author: 'princess',
            },
            {
                id: '18',
                content: "3 hours, but, yeah, I'm good.",
                author: 'princess',
            },
        ]
];

const SandBox = () => {
    const [state, setState] = useState({
        columns: data,
        ordered: Object.keys(data)
    });

    const onDragEnd = (result) => {
        console.log('DRAG END');
        // dropped nowhere
        if (!result.destination) {
            return;
        }

        const source = result.source;
        const destination = result.destination;

        // did not move anywhere - can bail early
        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        // reordering column
        if (result.type === 'COLUMN') {
            const ordered = reorder(
                state.ordered,
                source.index,
                destination.index,
            );

            setState({
                ordered: ordered,
                columns: state.columns
            });

            return;
        }

        const data = reorderQuoteMap({
            quoteMap: state.columns,
            source,
            destination,
        });

        setState({
            ordered: state.ordered,
            columns: data.quoteMap,
        });
    };

    const board = (
        <Droppable
            droppableId="board"
            type="COLUMN"
            direction="horizontal"
            ignoreContainerClipping={true}
            isCombineEnabled={false}
        >
            {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                    {state.ordered.map((key, index) => (
                        <Column
                            key={key}
                            index={index}
                            title={key}
                            quotes={state.columns[key]}
                            isCombineEnabled={false}
                        />
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            {board}
        </DragDropContext>
    );
};*/

import React, { useState } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
    const [state, setState] = useState([getItems(10), getItems(5, 10)]);

    function onDragEnd(result) {
        console.log(result);
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }
        const sInd = +source.droppableId;
        const dInd = +destination.droppableId;

        if (sInd === dInd) {
            const items = reorder(state[sInd], source.index, destination.index);
            const newState = [...state];
            newState[sInd] = items;
            setState(newState);
        } else {
            const result = move(state[sInd], state[dInd], source, destination);
            const newState = [...state];
            newState[sInd] = result[sInd];
            newState[dInd] = result[dInd];

            setState(newState);
        }
    }

    return (
        <div>
            <button
                type="button"
                onClick={() => {
                    setState([...state, []]);
                }}
            >
                Add new group
            </button>
            <button
                type="button"
                onClick={() => {
                    setState([...state, getItems(1)]);
                }}
            >
                Add new item
            </button>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
                <DragDropContext onDragEnd={onDragEnd}>
                    {state.map((el, ind) => (
                        <Droppable key={ind} droppableId={`${ind}`}>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    style={getListStyle(snapshot.isDraggingOver)}
                                    {...provided.droppableProps}
                                >
                                    {el.map((item, index) => (
                                        <Draggable
                                            key={item.id}
                                            draggableId={item.id}
                                            index={index}
                                        >
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={getItemStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps.style
                                                    )}
                                                >
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "space-around"
                                                        }}
                                                    >
                                                        {item.content}
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const newState = [...state];
                                                                newState[ind].splice(index, 1);
                                                                setState(
                                                                    newState.filter(group => group.length)
                                                                );
                                                            }}
                                                        >
                                                            delete
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </DragDropContext>
            </div>
        </div>
    );
};


export default SandBox;
