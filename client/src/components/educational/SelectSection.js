import { Box } from "@material-ui/core";
import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const ResumeItem = [
  "Personal Information",
  "Education",
  "Work Experience",
  "Relavant Project",
  "Skills",
];

const SelectSection = () => {
  const [itemList, setItemList] = useState(ResumeItem);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const newItems = [...itemList];
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    setItemList(newItems);
  };

  return (
    <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {itemList.map((item, index) => (
              <Draggable
                draggableId={`drag_${index}`}
                index={index}
                key={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <DragItem item={item} />
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const DragItem = ({ item }) => {
  return <Box>{item}</Box>;
};

export default SelectSection;
