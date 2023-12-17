import {forwardRef} from "react";

export default forwardRef(function Card({children, className, ...props}, ref) {
  return (
    <div
      ref={ref}
      className={`gap-2 bg-white dark:bg-neutral-800 py-1 px-4 drop-shadow rounded-md ${className}`}
      {...props}>
      {children}
    </div>
  );
});
