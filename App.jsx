import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ModuleList from './components/ModuleList';
import './App.css';

const App = () => {
  const [modules, setModules] = useState([]);

  const addModule = () => {
    const newModule = {
      id: `module-${Date.now()}`,
      name: `Module ${modules.length + 1}`,
      resources: [],
    };
    setModules([...modules, newModule]);
  };

  const updateModule = (id, updatedModule) => {
    setModules(modules.map(mod => mod.id === id ? updatedModule : mod));
  };

  const deleteModule = (id) => {
    setModules(modules.filter(mod => mod.id !== id));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(modules);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setModules(items);
  };

  return (
    <div className="app">
      <header className="header">Course Builder</header>
      <button className="add-button" idName="module" onClick={addModule}>Add Module</button>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="modules">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {modules.map((module, index) => (
                <Draggable key={module.id} draggableId={module.id} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <ModuleList
                        module={module}
                        onUpdate={updateModule}
                        onDelete={deleteModule}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default App;
