import {forwardRef, useContext} from "react";
import {DataContext} from "../../../store/DataContext";
import Dialog from "../Dialog";
import Card from "../Card";
import Button from "../Button";
import CategorizationElement from "./CategorizationElement";

export default forwardRef(function CategorizationListDialog({header, type, selectedGroup}, ref) {
  const dataCtx = useContext(DataContext);
  const currentData =
    type == "Category"
      ? dataCtx.dataState.categories
      : dataCtx.dataState.cardGroups[selectedGroup].tags;
  return (
    <Dialog ref={ref} header={header}>
      <Card className="w-56 sm:w-80 flex flex-col !bg-neutral-400 dark:!bg-neutral-900 h-[50vh] max-h-[250px] overflow-y-auto">
        {currentData.map((elem, i) => {
          if (i === 0) return; // ? Since index 0 is a categorization called "None"
          return <CategorizationElement type={type} key={elem.key} data={elem} />;
        })}
      </Card>
    </Dialog>
  );
});
