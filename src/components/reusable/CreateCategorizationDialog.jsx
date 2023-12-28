import {forwardRef} from "react";
import Dialog from "./Dialog";
import Card from "./Card";
import Button from "./Button";
import FormInput from "./FormInput";
import ColorButton from "./ColorButton";
import Header from "./Header";
export default forwardRef(function CreateCategorizationDialog({header, type}, ref) {
  // TODO make dafault color black
  return (
    <Dialog ref={ref} header={header}>
      <form className="flex flex-col gap-2">
        <Card className="!bg-neutral-300 dark:!bg-neutral-900 flex flex-col gap-1 py-2">
          <h3 className="text-sm opacity-95">Information:</h3>
          <FormInput inputId="group-category" labelTitle={type} isRequired />
          <Card className="flex items-center flex-col !gap-0 p-1">
            <p className="self-start">Color</p>
            <div className="bg-neutral-400 dark:bg-neutral-900 p-2 rounded-md overflow-x-scroll whitespace-nowrap w-56">
              <ColorButton color="black" />
              <ColorButton color="grey" />
              <ColorButton color="Cornsilk" />
              <ColorButton color="white" />
              <ColorButton color="Crimson" />
              <ColorButton color="Red" />
              <ColorButton color="DarkRed" />
              <ColorButton color="DarkTurquoise" />
              <ColorButton color="DarkSlateGrey" />
              <ColorButton color="Blue" />
              <ColorButton color="DarkSlateBlue" />
              <ColorButton color="DarkOrange" />
              <ColorButton color="Yellow" />
              <ColorButton color="Gold" />
              <ColorButton color="Green" />
              <ColorButton color="DarkOrchid" />
              <ColorButton color="LawnGreen" />
              <ColorButton color="Azure" />
              <ColorButton color="SaddleBrown" />
              <ColorButton color="Sienna" />
            </div>
          </Card>
        </Card>

        <Button
          className="border-2 border-neutral-300 dark:!border-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-900 transition-all duration-75"
          type="submit">
          Create
        </Button>
      </form>
    </Dialog>
  );
});

// TODO: Limit Inputs Text Length, (Name, Category)
// TODO: For categories, make sure they dont repeat
// TODO: For categories, have "N/A" as default category
