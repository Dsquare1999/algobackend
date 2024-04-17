"use client"
import React from 'react';

import {
    DragDropContext,
    Draggable,
    DropResult,
    Droppable
} from "@hello-pangea/dnd"

const DashboardPage = () => {
    return (
        <div className='h-[100dvh] w-full border-[5px] border-black overflow-hidden'>
            <DragDropContext 
                onDragEnd={(result: DropResult) => {}}
            >
                <Droppable droppableId="droppable">
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps} 
                            className='border-destructive border-[5px] 
                                        h-full flex bg-gray-200'
                            >
                            <Draggable draggableId="jungle" index={0}>
                                {(provided) => (
                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                        className="border-emerald-500 border-[5px] w-[300vw]">
                                        <h1>Jungle Dashboard</h1>
                                        <p>Welcome to the jungle</p>

                                        <DragDropContext 
                                            onDragEnd={(result: DropResult) => {}}>

                                            <Droppable droppableId="sub-droppable">
                                                {(provided) => (
                                                    <div ref={provided.innerRef} {...provided.droppableProps} 
                                                        className='border-[5px] border-black h-auto w-full'>
                                                        <Draggable draggableId="jungle-1" index={0}>
                                                            {(provided) => (
                                                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                                                    className="border-slate-500 border-[5px] w-full">
                                                                    <h1>Sub Jungle Dashboard 1 </h1>
                                                                    <p>Welcome to the Sub Jungle 1</p>
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                        <Draggable draggableId="jungle-2" index={1}>
                                                            {(provided) => (
                                                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                                                    className="border-pink-500 border-[5px] w-full">
                                                                    <h1>Sub Jungle Dashboard 2</h1>
                                                                    <p>Welcome to the Sub Jungle 2</p>
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>
                                        </DragDropContext>
                                    </div>
                                )}
                            </Draggable>
                            <Draggable draggableId="moon" index={1}>
                                {(provided) => (
                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                        className="border-blue-500 border-[5px] w-full">
                                        <h1>Moon Dashboard</h1>
                                        <p>Welcome to the moon</p>
                                    </div>
                                )}
                            </Draggable>
                            <Draggable draggableId="sky" index={2}>
                                {(provided) => (
                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                        className="border-yellow-500 border-[5px] w-full">
                                        <h1>Sky Dashboard</h1>
                                        <p>Welcome to the sky</p>
                                    </div>
                                )}
                            </Draggable>
                            <Draggable draggableId="river" index={2}>
                                {(provided) => (
                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                        className="border-indigo-500 border-[5px] w-full">
                                        <h1>river Dashboard</h1>
                                        <p>Welcome to the river</p>
                                    </div>
                                )}
                            </Draggable>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        
        </div>
    );
}

export default DashboardPage;