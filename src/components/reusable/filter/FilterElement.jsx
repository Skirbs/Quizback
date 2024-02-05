export default function FilterElement({data, type, includeFilter}) {
  function checkFilterHandler() {
    includeFilter(data.name);
  }
  return (
    <label className="text-lg px-3 !bg-neutral-300 dark:!bg-neutral-900 flex-center gap-1 cursor-pointer relative rounded-full">
      <input
        type="checkbox"
        onChange={checkFilterHandler}
        className="filter-checkbox absolute opacity-0 [&:not(:checked)~span]:hidden [&:checked~span]:relative [&:checked~p]:font-medium cursor-pointer"
      />
      <span className="material-symbols-outlined">done</span>
      <p>{data.name}</p>
    </label>
  );
}
