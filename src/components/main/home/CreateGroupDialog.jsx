import {forwardRef} from "react";
import Dialog from "../../reusable/Dialog";
import Card from "../../reusable/Card";
import Button from "../../reusable/Button";
import FormInput from "../../reusable/FormInput";
export default forwardRef(function CreateGroupDialog(props, ref) {
  return (
    <Dialog ref={ref} header="Create Study Group">
      <form className="flex flex-col gap-2">
        <Card className="!bg-neutral-200 dark:!bg-neutral-900 flex flex-col gap-1 py-2">
          <h3 className="text-sm opacity-95">Information:</h3>
          <FormInput inputId="group-name" labelTitle="Group Name" isRequired />
          <label htmlFor="group-category">Category</label>
          <div className="flex gap-1">
            <select className="flex-[0.5] rounded-lg dark:bg-neutral-800" id="group-category">
              <option className="text-center" value="1">
                1
              </option>
              <option className="text-center" value="2">
                2
              </option>
              <option className="text-center" value="3">
                Lorem, ipsum.
              </option>
            </select>
            <Button
              onClick={(e) => {
                e.preventDefault();
              }}>
              +
            </Button>
          </div>
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
