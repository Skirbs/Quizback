import {useContext} from "react";
import CardGroupElem from "./CardGroupElem";
import {DataContext} from "../../../store/DataContext";

export default function CardGroupList() {
  const dataCtx = useContext(DataContext);
  return (
    <div className="flex flex-wrap justify-center  gap-2 ">
      {dataCtx.dataState.cardGroups[dataCtx.selectedGroup].cardsStored.map((elem, i) => {
        return (
          <CardGroupElem
            style={{animationDelay: `${i * 0.05}s`}}
            data={elem}
            index={i}
            key={elem.key}
          />
        );
      })}
    </div>
  );
}
