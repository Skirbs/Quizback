import {useEffect, useRef, useState} from "react";
import Card from "../../reusable/Card";
import Button from "../../reusable/Button";

export default function CardQuizElem({
  sideColor = "black",
  index,
  data,
  onEdit,
  onOpenDeleteDialog,
  ...props
}) {
  const [showAnswer, setShowAnswer] = useState(false);
  const settingRef = useRef();
  const cardRef = useRef();

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

  return (
    <Card
      ref={cardRef}
      className={`flex-center flex-col cursor-pointer hover:drop-shadow-lg transition-transform active:bg-neutral-50 relative min-w-full !w-full min-h-[60vh] py-5 px-8 gap-0 dark:bg-neutral-800 hover:-translate-y-1 animate-fade-up-bounce rounded-full`}
      onClick={(e) => {
        e.stopPropagation();
        showAnswerHandler();
      }}
      {...props}>
      <span
        style={{backgroundColor: `${sideColor}`}}
        className="absolute inset-y-0 left-0 w-1 rounded-full"
      />

      <div className="flex-col flex-1 gap-1 flex-center sm:gap-4">
        {!showAnswer ? (
          <>
            <h2 className="text-3xl font-semibold text-center break-words sm:text-5xl">Question</h2>
            <p className="inline-block text-base font-medium text-center break-all h-fit flex-center sm:text-2xl">
              {data.question}
            </p>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-semibold text-center break-words sm:text-5xl">Answer</h2>
            <p className="text-base font-medium text-center break-all h-fit flex-center sm:text-2xl">
              {data.answer}
            </p>
          </>
        )}
      </div>

      {/* <div className="self-start mt-2">
    <p className="text-sm opacity-80">Date Modified: 12/12/12 12:12</p>
    <p className="text-sm opacity-80">Date Added: 12/12/12 12:12</p>
  </div> */}

      <button
        className="absolute z-10 right-2 top-2"
        onClick={(e) => {
          e.stopPropagation();
          settingRef.current.classList.add("opacity-100");
          settingRef.current.classList.remove("opacity-0");
          settingRef.current.classList.remove("pointer-events-none");
        }}>
        <span className="material-symbols-outlined text-3xld">settings</span>
      </button>
      <Card
        ref={settingRef}
        className="absolute right-2 top-1 h-fit  z-50 drop-shadow-2xl flex flex-col !p-0 overflow-hidden transition-all opacity-0 pointer-events-none"
        onMouseLeave={(e) => {
          settingRef.current.classList.remove("opacity-100");
          settingRef.current.classList.add("opacity-0");
          settingRef.current.classList.add("pointer-events-none");
        }}>
        <Button
          className="!drop-shadow-none flex-1 flex justify-center mt-2"
          onClick={(e) => {
            e.preventDefault();
            onEdit(true);
          }}>
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
