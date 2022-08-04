import { Box, Input, Typography } from "@material-ui/core";
import { Alert, IconButton } from "@mui/material";
import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import classes from "./resume.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

const SelectSection = ({ itemList, setItemList }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState(false);

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

  const AddSection = () => {
    if (itemList.includes(name)) {
      setError(true);
      return;
    }
    setItemList((prev) => [...prev, name]);
    setIsTyping(false);
  };

  return (
    <>
      {error && (
        <Alert
          severity="error"
          onClose={() => setError(false)}
          sx={{ mt: "30px" }}
        >
          Section already exists!
        </Alert>
      )}
      <Box
        sx={{
          width: "300px",
          mx: "auto",
          height: "auto",
          mt: "50px",
          minHeight: "450px",
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
                            fontFamily: "inherit",
                            flex: 2,
                          }}
                        >
                          {item}
                        </Typography>
                        <IconButton
                          color="primary"
                          onClick={() =>
                            setItemList((prev) =>
                              prev.filter((e) => e !== item)
                            )
                          }
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </div>
                    )}
                  </Draggable>
                ))}
                {!isDragging &&
                  (!isTyping ? (
                    <div
                      className={classes["add-section"]}
                      onClick={() => setIsTyping(true)}
                    >
                      <AddIcon fontSize="small" color="primary" />
                      <Typography
                        variant="subtitle1"
                        style={{
                          fontFamily: "inherit",
                        }}
                      >
                        Add Section
                      </Typography>
                    </div>
                  ) : (
                    <div className={classes["new-section"]}>
                      <IconButton
                        color="primary"
                        onClick={() => setIsTyping(false)}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                      <Input
                        placeholder="Name of new section"
                        onChange={(e) => setName(e.target.value)}
                      />
                      <IconButton color="primary" onClick={AddSection}>
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </div>
                  ))}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Box>
    </>
  );
};

export default SelectSection;
