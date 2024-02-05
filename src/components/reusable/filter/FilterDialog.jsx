import {forwardRef, useContext} from "react";
import {DataContext} from "../../../store/DataContext";
import Dialog from "../Dialog";
import Card from "../Card";
import Button from "../Button";
import FilterElement from "./FilterElement";
export default forwardRef(function CategorizationListDialog({header, type, selectedGroup}, ref) {
  const dataCtx = useContext(DataContext);
  const currentData =
    type == "Category"
      ? dataCtx.dataState.categories
      : dataCtx.dataState.cardGroups[selectedGroup].tags;

  return (
    <Dialog ref={ref} header={header}>
      <div className="flex flex-col gap-2 py-1.5 w-[50vw] max-w-[400px]">
        {currentData.length === 1 ? (
          <p className="text-center text-xl font-medium">No {type} Available</p>
        ) : (
          <>
            <div className="flex-center flex-wrap w-full h-fit max-h-[250px] overflow-y-hidden gap-1">
              {currentData.map((elem, i) => {
                if (i === 0) return; // ? Since index 0 is a categorization called "None"
                return <FilterElement type={type} key={elem.key} data={elem} />;
              })}
            </div>
            <Button
              className="mx-2 px-3 !bg-neutral-200 dark:!bg-neutral-900 flex-center gap-2 hover:!bg-neutral-300 hover:dark:!bg-neutral-925 transition-colors duration-75"
              noOpacityChange>
              <span className="material-symbols-outlined">tune</span>
              Apply
            </Button>
          </>
        )}
      </div>
    </Dialog>
  );
});
