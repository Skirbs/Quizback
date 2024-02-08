import {forwardRef} from "react";
export default forwardRef(function ColorButton({color = "black", className, ...props}, ref) {
  return (
    <button
      style={{backgroundColor: color}}
      className={`w-12 h-12 mx-1 rounded-lg transition-[border-radius] ${className}`}
      {...props}
    />
  );
});
