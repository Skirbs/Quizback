import {forwardRef, useContext} from "react";
import {DataContext} from "../../../store/DataContext";
import Dialog from "../Dialog";
import Card from "../Card";
import Button from "../Button";
import CategorizationElement from "./CategorizationElement";

export default forwardRef(function CategorizationListDialog({header, type}, ref) {
  const dataCtx = useContext(DataContext);
  const currentData =
    type == "Category"
      ? dataCtx.dataState.categories
      : dataCtx.dataState.cardGroups[dataCtx.selectedGroup].tags;
  return (
    <Dialog ref={ref} header={header}>
      <Card className="!w-72 flex flex-col !bg-neutral-400 dark:!bg-neutral-900 h-[50vh] max-h-[250px]">
        {currentData.map((elem) => {
          return <CategorizationElement type={type} key={elem.key} data={elem} />;
        })}
      </Card>
    </Dialog>
  );
});
