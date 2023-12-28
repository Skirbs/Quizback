import {forwardRef} from "react";
//TODO: Create a "selected" parameter and change design if it is selected
export default forwardRef(function ColorButton({color = "black", ...props}, ref) {
  return <button className="w-12 h-12 mx-1 rounded-lg " style={{backgroundColor: color}} />;
});
