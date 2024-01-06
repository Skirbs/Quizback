import {forwardRef} from "react";
import Dialog from "./Dialog";
import Card from "./Card";
import Button from "./Button";
import FormInput from "./FormInput";
import ColorButton from "./ColorButton";
import Header from "./Header";
// TODO: Future feature: make sure name doesnt repeat
export default forwardRef(function CreateCategorizationDialog(
  {header, type, editMode, onClose, ...props},
  ref
) {
  const currentColor = "Black";
  function submitHandler(e) {
    e.preventDefault();
    if (editMode) {
      return;
    }
    console.log(type); // Tag or Category
  }
  function changeColor(e) {
    e.preventDefault();
    console.log(e.target);

    // TODO: Get all children of the div containing colorbutton
    // TODO: Get color attribute somethng
  }
  // ? onClose is a function for CategorizationListDialog. Used for edit mode. make sure this is executed when submitting
  return (
    <Dialog ref={ref} header={header} onClose={onClose} onSubmit={submitHandler} {...props}>
      <form className="flex flex-col gap-2">
        <Card className="!bg-neutral-300 dark:!bg-neutral-900 flex flex-col gap-1 py-2">
          <h3 className="text-sm opacity-95">Information:</h3>
          <FormInput inputId="group-category" labelTitle={`${type}:`} isRequired />
          <Card className="flex items-center flex-col !gap-0 p-1">
            <p className="self-start">Color:</p>
            <div className="bg-neutral-400 dark:bg-neutral-900 p-2 rounded-md overflow-x-scroll whitespace-nowrap w-56">
              <ColorButton onClick={changeColor} color="black" />
              <ColorButton onClick={changeColor} color="grey" />
              <ColorButton onClick={changeColor} color="cornsilk" />
              <ColorButton onClick={changeColor} color="white" />
              <ColorButton onClick={changeColor} color="crimson" />
              <ColorButton onClick={changeColor} color="red" />
              <ColorButton onClick={changeColor} color="darkRed" />
              <ColorButton onClick={changeColor} color="darkTurquoise" />
              <ColorButton onClick={changeColor} color="darkSlateGrey" />
              <ColorButton onClick={changeColor} color="blue" />
              <ColorButton onClick={changeColor} color="darkSlateBlue" />
              <ColorButton onClick={changeColor} color="darkOrange" />
              <ColorButton onClick={changeColor} color="yellow" />
              <ColorButton onClick={changeColor} color="gold" />
              <ColorButton onClick={changeColor} color="green" />
              <ColorButton onClick={changeColor} color="darkOrchid" />
              <ColorButton onClick={changeColor} color="lawnGreen" />
              <ColorButton onClick={changeColor} color="azure" />
              <ColorButton onClick={changeColor} color="saddleBrown" />
              <ColorButton onClick={changeColor} color="sienna" />
            </div>
          </Card>
        </Card>

        <Button
          className="border-2 border-neutral-300 dark:!border-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-900 transition-all duration-75"
          type="submit">
          {editMode ? "Edit" : "Create"}
        </Button>
      </form>
    </Dialog>
  );
});

// TODO: Limit Inputs Text Length, (Name, Category)
// TODO: For categories, make sure they dont repeat
// TODO: For categories, have "N/A" as default category
