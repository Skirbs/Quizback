import {useContext, useEffect, useRef, useState} from "react";
import {UtilContext} from "../../../store/UtilContext";
import {DataContext} from "../../../store/DataContext";
import Card from "../../reusable/Card";
import Button from "../../reusable/Button";
export default function CardGroupElem({data, index, onOpenDeleteDialog, ...props}) {
  const utilCtx = useContext(UtilContext);
  const dataCtx = useContext(DataContext);
  const [showAnswer, setShowAnswer] = useState(false);
  const settingRef = useRef();
  const cardRef = useRef();

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

  function showAnswerHandler() {
    setTimeout(() => {
      setShowAnswer((prev) => !prev);
    }, 120);

    // ? Code below repeats the animation
    cardRef.current.classList.remove("animate-scale-in-out-vertical");
    setTimeout(() => {
      cardRef.current.classList.add("animate-scale-in-out-vertical");
    }, 10);
  }

  useEffect(() => {
    setTimeout(() => {
      cardRef.current.style.animationDelay = "0s";
      cardRef.current.classList.remove("animate-fade-up-bounce");
    }, 200 * (index + 1));
  });

  return (
    <Card
      ref={cardRef}
      className={`flex flex-col cursor-pointer hover:drop-shadow-lg transition-transform active:bg-neutral-50 relative w-[300px] py-3 !px-2 gap-0 dark:bg-neutral-800 hover:-translate-y-1 animate-fade-up-bounce`}
      onClick={(e) => {
        e.stopPropagation();
        showAnswerHandler();
      }}
      {...props}>
      <span
        style={{backgroundColor: `${data.sideColor}`}}
        className="absolute w-1 left-0 inset-y-0 rounded-full"
      />

      <div className="flex-1 flex-center flex-col">
        {!showAnswer ? (
          <>
            <h2 className="break-words text-2xl text-center font-semibold">Question</h2>
            <p className="font-medium text-center w-full break-words inline-block flex-1 flex-center">
              {utilCtx.truncateString(`${data.question}`, 40)}
            </p>
          </>
        ) : (
          <>
            <h2 className="break-words text-2xl text-center font-semibold">Answer</h2>
            <p className="font-medium text-center w-full break-all inline-block flex-1 flex-center">
              {utilCtx.truncateString(`${data.answer}`, 45)}
            </p>
          </>
        )}
      </div>

      {/* <div className="self-start mt-2">
        <p className="text-sm opacity-80">Date Modified: 12/12/12 12:12</p>
        <p className="text-sm opacity-80">Date Added: 12/12/12 12:12</p>
      </div> */}

      <button
        className="absolute right-2 top-2 z-10"
        onClick={(e) => {
          e.stopPropagation();
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
        <Button
          className="!drop-shadow-none flex-1 flex justify-center mb-2"
          onClick={(e) => {
            e.preventDefault();
            onOpenDeleteDialog(data.question, data.key);
          }}>
          <span className="material-symbols-outlined">delete</span>
          delete
        </Button>
      </Card>
    </Card>
  );
}
