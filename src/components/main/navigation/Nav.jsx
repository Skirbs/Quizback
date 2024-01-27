import {Link} from "react-router-dom";
import {DataContext} from "../../../store/DataContext";
import {useContext} from "react";

// import Logo from "../../../../public/Logo.png";
export default function Nav() {
  const dataCtx = useContext(DataContext);

  if (dataCtx.darkMode === "true") {
    document.documentElement.classList.add("dark");
  }

  function toggleDark() {
    document.documentElement.classList.toggle("dark");
    dataCtx.toggleDarkMode();
  }
  return (
    <>
      <nav className="flex justify-between px-12 py-2 bg-white dark:bg-neutral-800 w-screen drop-shadow-md fixed top-0 inset-x-0 z-50">
        <Link to="/" className="outline-none">
          <img alt="Logo" />
        </Link>

        <button onClick={toggleDark} className="relative overflow-hidden h-7 w-7">
          <div className="flex flex-col items-center px-0 gap-1 inset-x-0 absolute top-0 pt-[2px] transition-all ease-out duration-150 dark:-top-7">
            <span className="material-symbols-outlined flex-center w-fit">light_mode</span>
            <span className="material-symbols-outlined flex-center w-fit">dark_mode</span>
          </div>
        </button>
      </nav>
    </>
  );
}
