import {useRef} from "react";
import Button from "./Button";
import {Link} from "react-router-dom";

export default function GoBack({to}) {
  return (
    <Link
      to={to}
      className="fixed bg-white dark:bg-neutral-800 rounded-full flex-center left-4 bottom-4 w-[3rem] h-[3rem] z-50 !opacity-100">
      <span className="text-3xl material-symbols-outlined">chevron_left</span>
    </Link>
  );
}
