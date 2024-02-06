import {forwardRef, useContext, useEffect, useReducer, useRef} from "react";
import {DataContext} from "../../../store/DataContext";
import Dialog from "../Dialog";
import Button from "../Button";
import FilterElement from "./FilterElement";
export default forwardRef(function CategorizationListDialog(
  {header, type, selectedGroup, onApplyFilter},
  ref
) {
  const dataCtx = useContext(DataContext);

  const currentData =
    type == "Category"
      ? dataCtx.dataState.categories
      : dataCtx.dataState.cardGroups[selectedGroup].tags;

  const currentFilters = useRef([]); // ? These are categories or tags that is used to filter the data
  useEffect(() => {
    uncheckAllCheckboxes();
    currentFilters.current = [];
  }, [dataCtx.dataState]);

  function uncheckAllCheckboxes() {
    const filterCheckboxes = document.querySelectorAll(".filter-checkbox");
    for (const checkbox of filterCheckboxes) {
      checkbox.checked = false;
    }
  }

  function includeFilter(name) {
    if (currentFilters.current.includes(name)) {
      currentFilters.current.splice(currentFilters.current.indexOf(name), 1);
    } else {
      currentFilters.current.push(name);
    }
    console.log(currentFilters.current);
  }

  return (
    <Dialog ref={ref} header={header}>
      <div className="flex flex-col gap-2 py-1.5 w-[50vw] max-w-[400px]">
        {currentData.length === 1 ? (
          <p className="text-center text-xl font-medium">No {type} Available</p>
        ) : (
          <>
            <div className="flex-center flex-wrap w-full h-fit max-h-[250px] overflow-y-hidden gap-1">
              {currentData.map((elem) => {
                return (
                  <FilterElement
                    type={type}
                    key={elem.key}
                    data={elem}
                    includeFilter={includeFilter}
                  />
                );
              })}
            </div>
            <div className="flex w-full">
              <Button
                className="mx-2 px-3 flex-1 !border-2 !border-neutral-500 dark:!border-neutral-900 flex-center gap-2 hover:opacity-80 transition-[opacity] duration-75"
                noOpacityChange
                onClick={() => {
                  currentFilters.current = [];
                  onApplyFilter([]);
                  uncheckAllCheckboxes();
                  ref.current.close();
                }}>
                <span className="material-symbols-outlined">undo</span>
                Revert
              </Button>
              <Button
                className="mx-2 px-3 flex-1 !bg-neutral-200 dark:!bg-neutral-900 flex-center gap-2 hover:!bg-neutral-300 hover:dark:!bg-neutral-925 transition-colors duration-75"
                noOpacityChange
                onClick={() => {
                  onApplyFilter(currentFilters.current);
                  ref.current.close();
                }}>
                <span className="material-symbols-outlined">tune</span>
                Apply
              </Button>
            </div>
          </>
        )}
      </div>
    </Dialog>
  );
});
