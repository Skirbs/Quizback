import {Link} from "react-router-dom";
import {DataContext} from "../../../store/DataContext";
import {useContext, useEffect, useRef} from "react";

// import Logo from "../../../../public/Logo.png";
export default function Nav() {
  const dataCtx = useContext(DataContext);
  const cardDateRef = useRef();
  const groupDateRef = useRef();

  useEffect(() => {
    if (dataCtx.darkMode === "true") {
      document.documentElement.classList.add("dark");
    }

    if (dataCtx.showCardDates === "false") {
      cardDateRef.current.classList.add("opacity-70");
    }

    if (dataCtx.showGroupDates === "false") {
      groupDateRef.current.classList.add("opacity-70");
    }
  }, []);

  function toggleDark() {
    document.documentElement.classList.toggle("dark");
    dataCtx.toggleDarkMode();
  }

  function toggleShowCardDate() {
    dataCtx.toggleShowCardDate();
    cardDateRef.current.classList.toggle("opacity-70");
  }

  function toggleShowGroupDate() {
    dataCtx.toggleShowGroupDate();
    groupDateRef.current.classList.toggle("opacity-70");
  }

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 flex justify-between w-screen px-12 py-2 bg-white dark:bg-neutral-800 drop-shadow-md">
        <Link to="/Quizback" className="outline-none">
          <img alt="Logo" />
        </Link>

        <div className="flex-center">
          <button
            onClick={toggleShowGroupDate}
            className="relative h-7 w-7 transition-all after:content-['Show_Group_Dates'] tooltip"
            ref={groupDateRef}>
            <span className="material-symbols-outlined">today</span>
          </button>

          <button
            onClick={toggleShowCardDate}
            className="relative h-7 w-7 transition-all after:content-['Show_Card_Dates'] tooltip"
            ref={cardDateRef}>
            <span className="material-symbols-outlined">calendar_month</span>
          </button>

          <button onClick={toggleDark} className="relative overflow-hidden h-7 w-7">
            <div className="flex flex-col items-center px-0 gap-1 inset-x-0 absolute top-0 pt-[2px] transition-all ease-out duration-150 dark:-top-7">
              <span className="material-symbols-outlined flex-center w-fit">light_mode</span>
              <span className="material-symbols-outlined flex-center w-fit">dark_mode</span>
            </div>
          </button>
        </div>
      </nav>
    </>
  );
}
