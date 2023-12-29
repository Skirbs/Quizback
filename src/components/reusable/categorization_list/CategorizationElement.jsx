import {forwardRef, useState} from "react";
import ConfirmationDelete from "./ConfirmationDelete";

export default forwardRef(function CategorizationElement({color = "black"}, ref) {
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  function openDeleteConfirmation(state) {
    setDeleteConfirmation(state);
  }

  return (
    <div className="bg-neutral-300 dark:bg-neutral-800 w-64 flex-shrink-0 flex rounded gap-1 relative">
      <span className="min-w-[3px] " style={{backgroundColor: color}} />
      <p className="text-lg">Tag Name</p>
      <div className=" flex justify-end items-center flex-1 gap-1">
        <button>
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
  );
});
