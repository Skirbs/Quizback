import {forwardRef, useContext, useEffect, useRef, useState} from "react";
import {UtilContext} from "../../../store/UtilContext";
import {DataContext} from "../../../store/DataContext";
import ConfirmationDelete from "./ConfirmationDelete";
import CreateCategorizationDialog from "../CreateCategorizationDialog";

export default forwardRef(function CategorizationElement({data, type}, ref) {
  const utilCtx = useContext(UtilContext);
  const dataCtx = useContext(DataContext);

  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [editMode, setEditMode] = useState(false);

  function openDeleteConfirmation(state) {
    setDeleteConfirmation(state);
  }
  function openEdit(state) {
    setEditMode(state);
  }

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
        editKey={data.key}
        onClose={() => openEdit(false)}
        ref={editDialogRef}
      />
    );
  }
  return (
    <>
      {editMode && <EditDialog />}
      <div className="relative flex flex-shrink-0 w-full gap-1 rounded bg-neutral-300 dark:bg-neutral-800">
        <span className="min-w-[3px] " style={{backgroundColor: data.sideColor}} />
        <p className="text-lg">{utilCtx.truncateString(data.name, 10)}</p>
        <div className="flex items-center justify-end flex-1 gap-1 ">
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
            onDelete={() => {
              if (type == "Category") {
                dataCtx.removeCategory(data.key);
              } else {
                dataCtx.removeTag(data.key);
              }
            }}
            type={type}
          />
        )}
      </div>
    </>
  );
});
