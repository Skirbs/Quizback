import {forwardRef, useImperativeHandle, useState, useEffect, useRef, useContext} from "react";
import Dialog from "./Dialog";
import Button from "./Button";
import {DataContext} from "../../store/DataContext";

export default forwardRef(function RestartStudyTimeDialog({...props}, ref) {
  const dataCtx = useContext(DataContext);

  function onCancel(e) {
    e.preventDefault();
    ref.current.close();
  }
  function onRestart(e) {
    e.preventDefault();
    dataCtx.restartCardStudyTime();
    ref.current.close();
  }

  return (
    <Dialog ref={ref} header={`Restart Quiz Study Date?`} {...props}>
      <div className="max-w-md p-2 rounded-lg bg-neutral-300 dark:bg-neutral-900">
        <p className="inline-block w-full text-center break-words">
          Are you sure you want to restart Quiz Dates back to the start?
        </p>
        <div className="gap-4 my-1 flex-center ">
          <Button className="text-lg px-3 !bg-neutral-200 dark:!bg-neutral-800" onClick={onCancel}>
            No
          </Button>
          <Button className="text-lg !bg-neutral-200 px-3 dark:!bg-neutral-800" onClick={onRestart}>
            Yes
          </Button>
        </div>
      </div>
    </Dialog>
  );
});
