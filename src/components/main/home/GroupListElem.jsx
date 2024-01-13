import {useRef, useEffect, useContext} from "react";
import Card from "../../reusable/Card";
import Button from "../../reusable/Button";
import {Link} from "react-router-dom";
import {utilContext} from "../../../store/UtilContext";
// ? sideColor should be any css-compatible color
export default function GroupListElem({data, ...props}) {
  const utilCtx = useContext(utilContext);
  const settingRef = useRef();

  function setSettingVisibility(visible) {
    if (visible) {
      settingRef.current.classList.add("opacity-100");
      settingRef.current.classList.remove("opacity-0");
      settingRef.current.classList.remove("pointer-events-none");
    } else {
      settingRef.current.classList.remove("opacity-100");
      settingRef.current.classList.add("opacity-0");
      settingRef.current.classList.add("pointer-events-none");
    }
  }

  useEffect(() => {
    function clickOutsideHandler(event) {
      if (settingRef.current && !settingRef.current.contains(event.target)) {
        setSettingVisibility(false);
      }
    }
    document.addEventListener("click", clickOutsideHandler, true);
  });

  return (
    <Link to="/list">
      <Card
        className={`flex flex-col cursor-pointer hover:drop-shadow-lg transition-transform active:bg-neutral-50 relative py-3 pl-5 w-[300px] dark:bg-neutral-800 hover:-translate-y-1 animate-fade-up-bounce`}
        {...props}>
        <span
          style={{backgroundColor: `${data.sideColor}`}}
          className="absolute w-1 left-0 inset-y-0 rounded-full"
        />
        <h2 className="text-left w-full text-4xl font-semibold">
          {utilCtx.truncateString(data.name, 10)}
        </h2>
        <div>
          <p className="text-base opacity-80">Date Modified: {data.dateCreated}</p>
          <p className="text-base opacity-80">Date Added: {data.dateModified}</p>
        </div>
        <button
          className="absolute right-2 top-2 z-10"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setSettingVisibility(true);
          }}>
          <span className="material-symbols-outlined">settings</span>
        </button>
        <Card
          ref={settingRef}
          className="absolute right-2 top-1 h-fit z-50 drop-shadow-2xl flex flex-col !p-0 overflow-hidden transition-all opacity-0 pointer-events-none">
          <Button className="!drop-shadow-none flex-1 flex justify-center mt-2">
            <span className="material-symbols-outlined">edit</span>
            edit
          </Button>
          <Button className="!drop-shadow-none flex-1 flex justify-center mb-2">
            <span className="material-symbols-outlined">delete</span>
            delete
          </Button>
        </Card>
      </Card>
    </Link>
  );

  // TODO: stop setting from executing url changes
}
