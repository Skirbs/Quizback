import {forwardRef} from "react";
//TODO: Create a "selected" parameter and change design if it is selected
export default forwardRef(function ColorButton({color = "black", className, ...props}, ref) {
  return (
    <button
      style={{backgroundColor: color}}
      className={`w-12 h-12 mx-1 rounded-lg transition-[border-radius] ${className}`}
      {...props}
    />
  );
});
