import Sort from "../main/home/Sort";
import Filter from "../main/home/filter";
import RestartStudyTime from "./RestartStudyTime";

export default function CardOptions({openFilterHandler, onSort, type}) {
  return (
    <div className="flex justify-center items-center py-2 gap-1 sm:justify-end">
      {type == "Cards" && <RestartStudyTime />}
      <Filter onOpenFilter={openFilterHandler} />
      <Sort onSort={onSort} type={type} />
    </div>
  );
}
