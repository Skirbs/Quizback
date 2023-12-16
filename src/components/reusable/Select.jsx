export default function Select({children, className, ...props}) {
  return (
    <select
      className={`rounded-full drop-shadow-md text-center px-2 outline-1 hover:drop-shadow-lg hover:opacity-90 active:bg-neutral-50 cursor-pointer dark:bg-neutral-800 ${className}`}
      {...props}>
      {children}
    </select>
  );
}
