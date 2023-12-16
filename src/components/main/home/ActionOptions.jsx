import Sort from "./Sort";
import Filter from "./filter";

export default function ActionOptions() {
  return (
    <div className="flex justify-end items-center py-2 gap-1">
      <Filter />
      <Sort />
    </div>
  );
}
