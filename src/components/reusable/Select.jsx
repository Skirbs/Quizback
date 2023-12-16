export default function Select({children, className, ...props}) {
  return (
    <select
      className={`rounded-full drop-shadow-md text-center px-2 outline-1 hover:drop-shadow-lg hover:opacity-90 active:bg-stone-50 cursor-pointer ${className}`}
      {...props}>
      {children}
    </select>
  );
}
