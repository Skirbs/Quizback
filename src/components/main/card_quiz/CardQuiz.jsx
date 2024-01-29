import {useContext} from "react";
import {DataContext} from "../../../store/DataContext";
import CardQuizElem from "./CardQuizElem";
import CardQuizOptions from "./CardQuizOptions";
export default function CardQuiz() {
  const dataCtx = useContext(DataContext);
  const dueCards = dataCtx.getQuizCards();
  return (
    <div className="flex w-fit -mt-10 h-screen">
      <div className="w-full flex-col flex-center gap-3">
        <div className="flex w-0 self-start gap-2">
          {dueCards.map((elem) => {
            const cardElem = elem.card;
            return (
              <CardQuizElem
                question={cardElem.question}
                answer={cardElem.answer}
                key={cardElem.key}
              />
            );
          })}
        </div>

        <CardQuizOptions />
      </div>
    </div>
  );
}
