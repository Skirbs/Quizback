import {useRef, forwardRef, useImperativeHandle, useEffect} from "react";
import {createPortal} from "react-dom";
import Card from "./Card";

export default forwardRef(function Dialog({header, children, onClose, ...props}, ref) {
  const dialogRef = useRef();

  function closeDialog() {
    // ? try catch is required because "onClose" function dont exist on other dialogs
    try {
      dialogRef.current.close();
      onClose();
    } catch (e) {}
  }
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialogRef.current.showModal();
      },
      close() {
        closeDialog();
      },
    };
  });
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeDialog();
      }
    });
  });
  return createPortal(
    <dialog
      className="bg-transparent rounded-3xl outline-none backdrop:bg-black backdrop:opacity-50 fixed animate-fade-up-bounce"
      ref={dialogRef}
      {...props}>
      <div className="absolute right-2 top-0.5 z-10">
        <button onClick={closeDialog} className="outline-none text-2xl font-semibold">
          x
        </button>
      </div>
      <Card className="!px-6">
        {header && (
          <h2 className="font-semibold text-3xl border-b-2 border-neutral-500 dark:border-neutral-900 pb-1 px-2 mb-1 text-center">
            {header}
          </h2>
        )}

        {children}
      </Card>
    </dialog>,
    document.querySelector("#dialogs")
  );
});
