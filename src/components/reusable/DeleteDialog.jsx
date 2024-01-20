import {forwardRef, useImperativeHandle, useState, useEffect, useRef, useContext} from "react";
import Dialog from "./Dialog";
import Button from "./Button";
import {DataContext} from "../../store/DataContext";
import {UtilContext} from "../../store/UtilContext";

export default forwardRef(function DeleteDialog({isCard, ...props}, ref) {
  const dataCtx = useContext(DataContext);
  const utilCtx = useContext(UtilContext);
  const [selectedName, setSelectedName] = useState("N/A");
  const currentKey = useRef("N/A");
  const currentCardIndex = useRef("N/A"); // ? This wont be used if current target is [group]
  const dialogRef = useRef();
  useImperativeHandle(ref, () => {
    return {
      changeData(name, key, cardIndex = "N/A") {
        setSelectedName(name);
        currentKey.current = key;
        currentCardIndex.current = cardIndex;
      },
      open() {
        // ? dialogRef also returns its imperative handle
        dialogRef.current.open();
      },
    };
  });
  function onCancel(e) {
    e.preventDefault();
    dialogRef.current.close();
  }
  function onDelete(e) {
    e.preventDefault();
    if (isCard) {
      dataCtx.removeCard(currentKey.current, currentCardIndex.current);
    } else {
      dataCtx.removeCardGroup(currentKey.current);
    }
    dialogRef.current.close();
  }

  return (
    <Dialog ref={dialogRef} header={`Delete ${isCard ? "card" : "card group"}?`} {...props}>
      <p className="break-words inline-block text-center w-full">
        Are you sure you want to delete "{utilCtx.truncateString(selectedName, 16)}"?
      </p>

      <div className="flex-center gap-4 my-1">
        <Button className="text-lg px-3 !bg-neutral-200 dark:!bg-neutral-900" onClick={onCancel}>
          No
        </Button>
        <Button className="text-lg px-3 !bg-neutral-200 dark:!bg-neutral-900" onClick={onDelete}>
          Yes
        </Button>
      </div>
    </Dialog>
  );
});
