import {forwardRef, useContext, useRef} from "react";
import Dialog from "../../reusable/Dialog";
import Card from "../../reusable/Card";
import Button from "../../reusable/Button";
import FormInput from "../../reusable/FormInput";
import Select from "../../reusable/Select";
import {DataContext} from "../../../store/DataContext";
export default forwardRef(function CreateCardDialog({onTag}, ref) {
  const dataCtx = useContext(DataContext);
  const formRef = useRef();
  const questionRef = useRef();
  const answerRef = useRef();
  const tagRef = useRef();

  function submitHandler(e) {
    e.preventDefault();
    const current_date = new Date().toLocaleDateString();

    dataCtx.addCard(
      questionRef.current.value,
      answerRef.current.value,
      tagRef.current.value,
      current_date,
      current_date,
      current_date
    );
    formRef.current.reset();

    // TODO: Side Color Changes depending on the category
    // TODO: Find category value (string) on tag database
  }

  return (
    <Dialog ref={ref} header="Create Card">
      <form className="flex flex-col gap-2" onSubmit={submitHandler} ref={formRef}>
        <Card className="!bg-neutral-300 dark:!bg-neutral-900 flex flex-col gap-1 py-2">
          <h3 className="text-sm opacity-95">Information:</h3>
          <FormInput
            ref={questionRef}
            inputId="card-question"
            labelTitle="Card Question"
            max={50}
            isRequired
          />
          <FormInput
            ref={answerRef}
            inputId="card-answer"
            labelTitle="Card Answer"
            max={50}
            isRequired
          />
          <Card>
            <label htmlFor="group-category">Tag</label>
            <div className="flex gap-1">
              <Select
                className="flex-[0.5] rounded-lg !bg-neutral-200 dark:!bg-neutral-700"
                ref={tagRef}
                id="group-category">
                <option className="text-center" value="1">
                  1
                </option>
                <option className="text-center" value="2">
                  2
                </option>
                <option className="text-center" value="3">
                  Lorem, ipsum.
                </option>
              </Select>
              <Button
                className="!bg-neutral-300 dark:!bg-neutral-700"
                onClick={(e) => {
                  e.preventDefault();
                  onTag();
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
