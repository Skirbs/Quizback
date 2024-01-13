import {forwardRef, useContext, useRef} from "react";
import {DataContext} from "../../../store/DataContext";
import Dialog from "../../reusable/Dialog";
import Card from "../../reusable/Card";
import Button from "../../reusable/Button";
import FormInput from "../../reusable/FormInput";
import Select from "../../reusable/Select";
export default forwardRef(function CreateGroupDialog({onCategory}, ref) {
  const dataCtx = useContext(DataContext);
  const formRef = useRef();
  const nameRef = useRef();
  const categoryRef = useRef();

  function submitHandler(e) {
    e.preventDefault();
    const current_date = new Date().toLocaleDateString();

    dataCtx.addCardGroup(
      nameRef.current.value,
      categoryRef.current.value,
      current_date,
      current_date
    );
    formRef.current.reset();

    // TODO: Side Color Changes depending on the category
    // TODO: Find category value (string) on tag database
  }
  return (
    <Dialog ref={ref} header="Create Study Group">
      <form className="flex flex-col gap-2" onSubmit={submitHandler} ref={formRef}>
        <Card className="!bg-neutral-300 dark:!bg-neutral-900 flex flex-col gap-1 py-2">
          <h3 className="text-sm opacity-95">Information:</h3>
          <FormInput inputId="group-name" labelTitle="Group Name" isRequired ref={nameRef} />
          <Card>
            <label htmlFor="group-category">Category</label>
            <div className="flex gap-1w-full">
              <Select
                className="flex-[0.5] rounded-lg !bg-neutral-200 dark:!bg-neutral-700 !w-full"
                id="group-category"
                ref={categoryRef}>
                {dataCtx.dataState.categories.map((elem) => {
                  return (
                    <option className="text-center" key={elem.key} value={elem.name}>
                      {elem.name}
                    </option>
                  );
                })}
              </Select>
              <Button
                className="!bg-neutral-300 dark:!bg-neutral-700"
                onClick={(e) => {
                  e.preventDefault();
                  onCategory();
                }}>
                +
              </Button>
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
