import {forwardRef} from "react";
import Card from "./Card";

export default forwardRef(function FormInput(
  {inputId, labelTitle, labelClass = "", inputClass = "", isTextArea, isRequired},
  ref
) {
  return (
    <Card className="flex flex-col !gap-0 p-1">
      <label htmlFor={inputId} className={`m-0 ${labelClass}`}>
        {labelTitle}
      </label>
      {isTextArea ? (
        <textarea
          id={inputId}
          className={`px-2 py-1 text-sm bg-neutral-200 dark:!bg-neutral-700 rounded-md outline-neutral-200 dark:!outline-neutral-600 resize-none focus:bg-neutral-100 focus:outline-1 transition-all ${inputClass}`}
          required={isRequired}
          ref={ref}></textarea>
      ) : (
        <input
          type="text"
          id={inputId}
          className={`px-2 py-1 text-sm bg-neutral-200 dark:!bg-neutral-700 rounded-md outline-neutral-200  focus:bg-neutral-100 transition-all ${inputClass}`}
          required={isRequired}
          ref={ref}
        />
      )}
    </Card>
  );
});
