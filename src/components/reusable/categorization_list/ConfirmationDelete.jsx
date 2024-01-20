import {forwardRef, useEffect, useRef} from "react";
import ReactDOM from "react-dom";
import Card from "../Card";
import Button from "../Button";

export default forwardRef(function ConfirmationDelete({type, index, onDelete, onCancel}, ref) {
  const dialogRef = useRef();

  useEffect(() => {
    function clickOutsideHandler(event) {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        onCancel();
      }
    }
    document.addEventListener("click", clickOutsideHandler, true);
  });

  return (
    <Card
      className="flex-center flex-col absolute right-0 -bottom-16 w-5/6 z-50 !bg-neutral-200 dark:!bg-neutral-800 animate-fade-up-bounce"
      ref={dialogRef}
      style={{zIndex: index}}>
      <p className="text-center text-xs font-semibold">
        Are you sure you want to remove this {type}?
      </p>
      <div className="flex-center gap-1">
        <Button className="text-sm" onClick={onCancel}>
          No
        </Button>
        <Button className="text-sm" onClick={onDelete}>
          Yes
        </Button>
      </div>
    </Card>
  );
});

// TODO Test on mobile if "clickOutsideHandler" Works
