import {useContext} from "react";
import {Link} from "react-router-dom";
import {DataContext} from "../../../store/DataContext";
import GroupListElem from "./GroupListElem";

export default function GroupList() {
  const dataCtx = useContext(DataContext);
  return (
    <div className="flex flex-wrap justify-center lg:justify-start gap-2 ">
      {dataCtx.dataState.cardGroups.map((elem, i) => {
        return (
          <GroupListElem style={{animationDelay: `${i * 0.05}s`}} data={elem} key={elem.key} />
        );
      })}
    </div>
  );
  // TODO: Use the correct array (the main data) for the array
  // TODO: Use the correct key for each element
}
