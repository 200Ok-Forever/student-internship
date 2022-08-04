import { Box, Typography } from "@material-ui/core";
import { IconButton } from "@mui/material";
import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import classes from "./resume.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

const SelectSection = ({ itemList, setItemList }) => {
  console.log("🚀 ~ itemList", itemList);
  const [isDragging, setIsDragging] = useState(false);
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const newItems = [...itemList];
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    setItemList(newItems);
    setIsDragging(false);
  };
  return (
    <Box
      sx={{
        width: "300px",
        mx: "auto",
        height: "auto",
        mt: "60px",
        minHeight: "400px",
      }}
    >
      <DragDropContext
        onDragEnd={onDragEnd}
        onDragStart={() => setIsDragging(true)}
      >
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
                      snapshot={snapshot}
                      className={classes.item}
                    >
                      <Typography
                        variant="subtitle1"
                        style={{
                          fontFamily: "Montserrat",
                          flex: 2,
                        }}
                      >
                        {item}
                      </Typography>
                      <IconButton
                        color="primary"
                        onClick={() =>
                          setItemList((prev) => prev.filter((e) => e !== item))
                        }
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </div>
                  )}
                </Draggable>
              ))}
              {!isDragging && (
                <div className={classes["add-section"]}>
                  <AddIcon fontSize="small" color="primary" />
                  <Typography
                    variant="subtitle1"
                    style={{
                      fontFamily: "Montserrat",
                    }}
                  >
                    Add Section
                  </Typography>
                </div>
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};

export default SelectSection;
