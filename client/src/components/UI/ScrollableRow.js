import React from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import IconButton from "@mui/material/IconButton";
import classes from "./UI.module.scss";

export default function ScrollableRow({ children }) {
  return (
    <div>
      <ScrollMenu
        scrollContainerClassName={classes.noScroll}
        LeftArrow={LeftArrow}
        RightArrow={RightArrow}
      >
        {children}
      </ScrollMenu>
    </div>
  );
}

function Arrow({ children, disabled, onClick }) {
  return (
    <IconButton disabled={disabled} onClick={onClick}>
      {children}
    </IconButton>
  );
}

export function LeftArrow() {
  const {
    // getItemById,
    getPrevItem,
    isFirstItemVisible,
    scrollToItem,
    visibleItemsWithoutSeparators,
    initComplete,
  } = React.useContext(VisibilityContext);

  const [disabled, setDisabled] = React.useState(
    !initComplete || (initComplete && isFirstItemVisible)
  );
  React.useEffect(() => {
    // NOTE: detect if whole component visible
    if (visibleItemsWithoutSeparators.length) {
      setDisabled(isFirstItemVisible);
    }
  }, [isFirstItemVisible, visibleItemsWithoutSeparators]);

  // NOTE: for scroll 1 item
  const clickHandler = () => {
    const prevItem = getPrevItem();
    scrollToItem(prevItem?.entry?.target, "smooth", "start");
    // OR
    // scrollToItem(
    //   getItemById(visibleItemsWithoutSeparators.slice(-2)[0]),
    //   "smooth",
    //   "end"
    // );
  };

  return (
    <Arrow disabled={disabled} onClick={clickHandler}>
      <ChevronLeftIcon fontSize="large" />
    </Arrow>
  );
}

export function RightArrow() {
  const {
    // getItemById,
    getNextItem,
    isLastItemVisible,
    scrollToItem,
    visibleItemsWithoutSeparators,
  } = React.useContext(VisibilityContext);

  const [disabled, setDisabled] = React.useState(
    !visibleItemsWithoutSeparators.length && isLastItemVisible
  );
  React.useEffect(() => {
    if (visibleItemsWithoutSeparators.length) {
      setDisabled(isLastItemVisible);
    }
  }, [isLastItemVisible, visibleItemsWithoutSeparators]);

  // NOTE: for scroll 1 item
  const clickHandler = () => {
    const nextItem = getNextItem();
    scrollToItem(nextItem?.entry?.target, "smooth", "end");
    // OR
    // scrollToItem(
    //   getItemById(visibleItemsWithoutSeparators[1]),
    //   "smooth",
    //   "start"
    // );
  };

  return (
    <Arrow disabled={disabled} onClick={clickHandler}>
      <ChevronRightIcon fontSize="large" />
    </Arrow>
  );
}
