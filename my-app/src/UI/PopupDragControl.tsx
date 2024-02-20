import React, { Fragment, useState } from "react";
import classes from "./PopupDragControl.module.css";

function PopupDragControl(props: any) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [popupPosition, setPopupPosition] = useState({
    top: window.innerHeight / 3,
    left: window.innerWidth / 3,
  });

  const dragStartHandler = (e: any) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - popupPosition.left,
      y: e.clientY - popupPosition.top,
    });
  };
  const dragHandler = (e: any) => {
    if (!isDragging) return;

    const newLeft = e.clientX - dragOffset.x;
    const newTop = e.clientY - dragOffset.y;
    setPopupPosition({ top: newTop, left: newLeft });
  };
  const dragEndHandler = () => {
    setIsDragging(false);
  };
  return (
    <Fragment>
      <div
        className={classes.modal}
        style={{
          top: popupPosition.top + "px",
          left: popupPosition.left + "px",
          transform: isDragging ? "none" : undefined,
        }}
        onMouseDown={dragStartHandler}
        onMouseMove={dragHandler}
        onMouseUp={dragEndHandler}
      >
        {props.children}
      </div>
    </Fragment>
  );
}

export default PopupDragControl;
