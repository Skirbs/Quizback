import {forwardRef, useImperativeHandle, useState, useEffect, useRef, useContext} from "react";
import Dialog from "./Dialog";
import Button from "./Button";
import {DataContext} from "../../store/DataContext";

export default forwardRef(function DeleteDialog({isCard, ...props}, ref) {
  const dataCtx = useContext(DataContext);
  const [selectedName, setSelectedName] = useState("N/A");
  const currentKey = useRef("N/A");
  const dialogRef = useRef();
  useImperativeHandle(ref, () => {
    return {
      changeData(name, key) {
        setSelectedName(name);
        currentKey.current = key;
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
    dataCtx.removeCardGroup(currentKey.current);
    dialogRef.current.close();
  }

  return (
    <Dialog ref={dialogRef} header={`Delete ${isCard ? "card" : "card group"}?`} {...props}>
      <p>Are you sure you want to delete {selectedName}?</p>

      <div className="flex-center gap-1">
        <Button className="text-sm" onClick={onCancel}>
          No
        </Button>
        <Button className="text-sm" onClick={onDelete}>
          Yes
        </Button>
      </div>
    </Dialog>
  );
});
