export default function FilterElement({data, type}) {
  return (
    <label className="text-lg px-3 !bg-neutral-300 dark:!bg-neutral-900 flex-center gap-1 cursor-pointer relative rounded-full">
      <input
        type="checkbox"
        className="absolute opacity-0 [&:not(:checked)~span]:hidden [&:checked~span]:relative [&:checked~p]:font-medium cursor-pointer"
      />
      <span className="material-symbols-outlined">done</span>
      <p>test</p>
    </label>
  );
}
