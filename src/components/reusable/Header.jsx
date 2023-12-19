export default function Header({title}) {
  return (
    <h2 className="text-center text-4xl font-semibold drop-shadow-lg bg-white dark:bg-neutral-800 p-2 rounded-lg">
      {title}
    </h2>
  );
}
