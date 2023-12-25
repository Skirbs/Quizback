import {useRef, forwardRef, useImperativeHandle} from "react";
import {createPortal} from "react-dom";
import Card from "./Card";

export default forwardRef(function Dialog({children}, ref) {
  const dialogRef = useRef();
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialogRef.current.showModal();
      },
      close() {
        dialogRef.current.close();
      },
    };
  });
  return createPortal(
    <dialog
      className="bg-transparent outline-none backdrop:bg-neutral-950 backdrop:opacity-30 relative"
      ref={dialogRef}>
      <form className="absolute right-2 top-0.5 z-10" method="dialog">
        <button className="outline-none text-2xl font-semibold" type="submit">
          x
        </button>
      </form>
      <Card className="!px-6">
        <h2 className="font-semibold text-3xl text-left">Header</h2>
        {children}
      </Card>
    </dialog>,
    document.querySelector("#dialogs")
  );
});
