import {useContext, useEffect, useRef} from "react";
import {Link} from "react-router-dom";
import {DataContext} from "../../../store/DataContext";
import GroupListElem from "./GroupListElem";
import DeleteDialog from "../../reusable/DeleteDialog";

export default function GroupList({displayGroup = []}) {
  const dataCtx = useContext(DataContext);
  const deleteDialog = useRef();

  console.log(displayGroup);

  function openDeleteDialogHandle(name, key) {
    deleteDialog.current.changeData(name, key);
    deleteDialog.current.open();
  }
  return (
    <>
      <DeleteDialog ref={deleteDialog} />
      <div className="flex flex-wrap justify-center gap-2 pb-5">
        {displayGroup.map((elem, i) => {
          return (
            <GroupListElem
              style={{animationDelay: `${i * 0.05}s`}}
              data={elem}
              key={elem.key}
              onOpenDeleteDialog={openDeleteDialogHandle}
            />
          );
        })}
      </div>
    </>
  );
}
