import {forwardRef, useContext, useEffect, useRef} from "react";
import {DataContext} from "../../../store/DataContext";
import Dialog from "../../reusable/Dialog";
import Card from "../../reusable/Card";
import Button from "../../reusable/Button";
import FormInput from "../../reusable/FormInput";
import Select from "../../reusable/Select";
export default forwardRef(function CreateGroupDialog(
  {onCategory, editMode, editKey, onClose},
  ref
) {
  const dataCtx = useContext(DataContext);
  const formRef = useRef();
  const nameRef = useRef();
  const categoryRef = useRef();

  useEffect(() => {
    if (editMode) {
      const groupObj = dataCtx.dataState.cardGroups[dataCtx.getGroupIndexById(editKey)];
      nameRef.current.value = groupObj.name;
      categoryRef.current.value = groupObj.categoryName;
    }
  });

  function submitHandler(e) {
    e.preventDefault();
    if (editMode) {
      dataCtx.editCardGroup(nameRef.current.value, categoryRef.current.value, editKey);
      onClose();
      formRef.current.reset();
      return;
    }
    dataCtx.addCardGroup(nameRef.current.value, categoryRef.current.value);
    formRef.current.reset();
  }

  return (
    <Dialog ref={ref} onClose={onClose} header={`${editMode ? "Edit" : "Create"} Study Group`}>
      <form className="flex flex-col gap-2" onSubmit={submitHandler} ref={formRef}>
        <Card className="!bg-neutral-300 dark:!bg-neutral-900 flex flex-col gap-1 py-2">
          <h3 className="text-sm opacity-95">Information:</h3>
          <FormInput
            inputId="group-name"
            labelTitle="Group Name"
            isRequired
            ref={nameRef}
            max={24}
          />
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
                tabIndex={-1}
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
          {`${editMode ? "Edit" : "Create"}`}
        </Button>
      </form>
    </Dialog>
  );
});
