import Sort from "../main/home/Sort";
import Filter from "../main/home/filter";

export default function CardOptions() {
  return (
    <div className="flex justify-center items-center py-2 gap-1 sm:justify-end">
      <Filter />
      <Sort />
    </div>
  );
}