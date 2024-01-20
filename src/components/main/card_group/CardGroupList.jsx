import {useContext, useRef} from "react";
import CardGroupElem from "./CardGroupElem";
import {DataContext} from "../../../store/DataContext";
import DeleteDialog from "../../reusable/DeleteDialog";

export default function CardGroupList({selectedGroup}) {
  const dataCtx = useContext(DataContext);
  const deleteDialog = useRef();

  function openDeleteDialogHandle(name, key) {
    deleteDialog.current.changeData(name, key, selectedGroup);
    deleteDialog.current.open();
  }
  return (
    <>
      <DeleteDialog ref={deleteDialog} isCard />
      <div className="flex flex-wrap justify-center items-start gap-2 pb-5">
        {dataCtx.dataState.cardGroups[selectedGroup].cardsStored.map((elem, i) => {
          return (
            <CardGroupElem
              style={{animationDelay: `${i * 0.05}s`}}
              data={elem}
              index={i}
              key={elem.key}
              onOpenDeleteDialog={openDeleteDialogHandle}
            />
          );
        })}
      </div>
    </>
  );
}
