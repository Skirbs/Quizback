export default function Button({children, className, ...props}) {
  return (
    <button
      className={`bg-white drop-shadow-md rounded-full px-2 hover:drop-shadow-lg hover:opacity-80 active:bg-stone-50   ${className}`}
      {...props}>
      {children}
    </button>
  );
}
