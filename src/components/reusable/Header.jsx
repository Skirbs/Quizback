export default function Header({title}) {
  return (
    <h2 className="p-2 text-4xl font-semibold text-center break-words bg-white rounded-lg drop-shadow-lg dark:bg-neutral-800">
      {title}
    </h2>
  );
}
