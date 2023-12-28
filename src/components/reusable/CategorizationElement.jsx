import {forwardRef} from "react";

export default forwardRef(function CategorizationElement({color = "black"}, ref) {
  return (
    <div className="bg-neutral-300 dark:bg-neutral-800 w-64 flex-shrink-0 flex rounded overflow-hidden gap-1">
      <span className="min-w-[3px] " style={{backgroundColor: color}} />
      <p className="text-lg">Tag Name</p>
      <div className=" flex justify-end items-center flex-1 gap-1">
        <button>
          <span className="material-symbols-outlined">edit</span>
        </button>
        <button>
          <span className="material-symbols-outlined">delete</span>
        </button>
      </div>
    </div>
  );
});
