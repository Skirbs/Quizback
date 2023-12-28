import {forwardRef} from "react";

export default forwardRef(function ColorButton({color = "black", ...props}, ref) {
  return <button className="w-12 h-12 mx-1 rounded-lg " style={{backgroundColor: color}} />;
});
