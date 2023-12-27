import {useRef} from "react";
import Button from "./Button";
import {Link} from "react-router-dom";

export default function GoBack({to}) {
  return (
    <Link
      to={to}
      className="absolute bg-white dark:bg-neutral-800 rounded-full flex-center left-4 bottom-4 w-[3rem] h-[3rem] z-50 !opacity-100">
      <span className="material-symbols-outlined text-3xl">chevron_left</span>
    </Link>
  );
}
