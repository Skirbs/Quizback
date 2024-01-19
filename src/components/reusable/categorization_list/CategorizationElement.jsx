import {forwardRef, useContext, useEffect, useRef, useState} from "react";
import ConfirmationDelete from "./ConfirmationDelete";
import CreateCategorizationDialog from "../CreateCategorizationDialog";
import {UtilContext} from "../../../store/UtilContext";

// TODO: change edit dialog header from "Edit Tag" to "Edit {name}"
export default forwardRef(function CategorizationElement({data, type}, ref) {
  const utilCtx = useContext(UtilContext);

  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [editMode, setEditMode] = useState(false);

  function openDeleteConfirmation(state) {
    setDeleteConfirmation(state);
  }
  function openEdit(state) {
    setEditMode(state);
  }

  useEffect(() => {
    console.log(editMode);
  });
  function EditDialog() {
    const editDialogRef = useRef();
    useEffect(() => {
      editDialogRef.current.open();
    });
    return (
      <CreateCategorizationDialog
        header={`Edit ${type}`}
        type={type}
        editMode
        onClose={() => openEdit(false)}
        ref={editDialogRef}
      />
    );
  }
  return (
    <>
      {editMode && <EditDialog />}
      <div className="bg-neutral-300 dark:bg-neutral-800 w-full flex-shrink-0 flex rounded gap-1 relative">
        <span className="min-w-[3px] " style={{backgroundColor: data.sideColor}} />
        <p className="text-lg">{utilCtx.truncateString(data.name, 10)}</p>
        <div className=" flex justify-end items-center flex-1 gap-1">
          <button
            onClick={() => {
              openEdit(true);
            }}>
            <span className="material-symbols-outlined">edit</span>
          </button>
          <button
            onClick={() => {
              openDeleteConfirmation(true);
            }}>
            <span className="material-symbols-outlined">delete</span>
          </button>
        </div>
        {deleteConfirmation && (
          <ConfirmationDelete
            onCancel={() => {
              openDeleteConfirmation(false);
            }}
          />
        )}
      </div>
    </>
  );
});
