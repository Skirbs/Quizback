export default function Button({children, className, ...props}) {
  return (
    <button
      className={`bg-white dark:bg-neutral-800 drop-shadow-md rounded-full px-2 hover:drop-shadow-lg hover:opacity-80 active:bg-neutral-50 ${className}`}
      {...props}>
      {children}
    </button>
  );
}
