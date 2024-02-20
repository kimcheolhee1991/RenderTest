import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import PopupDragControl from "./PopupDragControl";
import Button from "./Button";
import classes from "./ErrorModal.module.css";

const ErrorModalOverlay = (props: any) => {
  return (
    <div>
      <div className={classes.backdrop} />
      <PopupDragControl>
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={classes.content}>
          <p>{props.message}</p>
        </div>
        <footer className={classes.action}>
          <Button onClick={props.isConfirm}> 確認</Button>
        </footer>
      </PopupDragControl>
    </div>
  );
};

const portalElement = document.getElementById("overlays");
const ErrorModal = (props: any) => {
  const { title, message, onConfirm } = props;
  if (!portalElement) {
    return null;
  }
  const messageText = message ? message.result : null;
  const errorModalElements = ReactDOM.createPortal(<ErrorModalOverlay title={title} message={messageText} isConfirm={onConfirm}></ErrorModalOverlay>, portalElement);

  return <Fragment>{errorModalElements}</Fragment>;
};

export default ErrorModal;
