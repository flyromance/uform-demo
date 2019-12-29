import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

export default class Dnd extends React.Component {
    state = {
        list: [
            { label: '11', id: '11' },
            { label: '22', id: '22' },
            { label: '33', id: '33' },
        ],
    };
    handleDragStart = e => {
        console.log('start', e);
    };
    handleDragUpdate = e => {
        console.log('update', e);
    };
    handleDragEnd = e => {
        console.log('end', e);
        const { source, destination } = e;
        let list = this.state.list.slice();
        const [removed] = list.splice(source.index, 1);
        list.splice(destination.index, 0, removed);
        this.setState({
            list,
        });
    };

    render() {
        const { list } = this.state;
        return (
            <div>
                <DragDropContext
                    onDragEnd={this.handleDragEnd}
                    onDragUpdate={this.handleDragUpdate}
                    onDragStart={this.handleDragStart}
                >
                    <Droppable droppableId='droppable'>
                        {droppableProvided => (
                            <div ref={droppableProvided.innerRef}>
                                {list.map((item, idx) => {
                                    return (
                                        <Draggable
                                            draggableId={item.id}
                                            index={idx}
                                            key={item.id}
                                        >
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <span>{item.label}</span>
                                                </div>
                                            )}
                                        </Draggable>
                                    );
                                })}
                                {droppableProvided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        );
    }
}
