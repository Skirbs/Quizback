import {useContext, useRef, useState} from "react";
import {DataContext} from "../../../store/DataContext";
import CardQuizElem from "./CardQuizElem";
import CardQuizOptions from "./CardQuizOptions";
export default function CardQuiz() {
  const dataCtx = useContext(DataContext);
  const [dueCards, setDueCards] = useState(dataCtx.getQuizCard());
  const hasAnswered = useRef(false);
  const cardDiv = useRef();
  const cardElem = useRef();

  function nextCardHandler(proficiency) {
    if (hasAnswered.current) return;
    // ? Proficiency
    //  ? (0 => not understood)
    //  ? (1 => quite understood)
    //  ? (2 => fully understood)
    cardElem.current.classList.add("animate-fade-away-up");
    hasAnswered.current = true;
    dataCtx.addCardStudyTime(dueCards.key, proficiency);
    setTimeout(() => {
      setDueCards(dataCtx.getQuizCard());
      cardElem.current.classList.remove("animate-fade-away-up");

      setTimeout(() => {
        hasAnswered.current = false;
      }, 100);
    }, 400);
  }

  return (
    <div className="flex w-fit -mt-10 h-screen">
      <div className="w-full flex-col flex-center gap-3">
        {dueCards === "empty" || (
          <>
            <div
              ref={cardDiv}
              style={{left: "0vw"}}
              className="flex w-0 self-start gap-2 transition-all">
              <div ref={cardElem} className="min-w-[75vw] w-[75vw] self-center">
                <CardQuizElem
                  question={dueCards.question}
                  answer={dueCards.answer}
                  key={dueCards.key}
                />
              </div>
            </div>
            <CardQuizOptions onNextCard={nextCardHandler} />
          </>
        )}
      </div>
    </div>
  );
}
