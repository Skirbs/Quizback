import Sort from "./Sort";
import Filter from "./filter";

export default function ActionOptions() {
  return (
    <div className="flex justify-center items-center py-2 gap-1 sm:justify-end">
      <Filter />
      <Sort />
    </div>
  );
}
