import {useEffect, useRef} from "react";
import Card from "../../reusable/Card";
import Button from "../../reusable/Button";
// ? sideColor should be any css-compatible color
export default function GroupListElem({sideColor = "bg-black"}) {
  const settingRef = useRef();

  return (
    <Card
      className={`flex-center flex-col cursor-pointer hover:drop-shadow-lg transition-transform active:bg-neutral-50 relative py-3 pl-5 pr-16 dark:bg-neutral-800 hover:-translate-y-1`}
      onClick={(e) => {
        e.stopPropagation();
      }}>
      <span
        style={{backgroundColor: `${sideColor}`}}
        className="absolute w-1 left-0 inset-y-0 rounded-full"
      />
      <h2 className="text-left w-full text-4xl font-semibold">Title</h2>
      <div>
        <p className="text-base opacity-80">Date Modified: 12/12/12 12:12</p>
        <p className="text-base opacity-80">Date Added: 12/12/12 12:12</p>
      </div>
      <button
        className="absolute right-2 top-2 z-10"
        onClick={(e) => {
          e.stopPropagation();
          settingRef.current.classList.add("opacity-100");
          settingRef.current.classList.remove("opacity-0");
          settingRef.current.classList.remove("pointer-events-none");
        }}>
        <span className="material-symbols-outlined">settings</span>
      </button>
      <Card
        ref={settingRef}
        className="absolute -right-16 top-1 h-fit z-20 drop-shadow-2xl flex flex-col !p-0 overflow-hidden transition-all opacity-0 pointer-events-none"
        onMouseLeave={(e) => {
          settingRef.current.classList.remove("opacity-100");
          settingRef.current.classList.add("opacity-0");
          settingRef.current.classList.add("pointer-events-none");
        }}>
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
  );
}
