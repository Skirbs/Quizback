import CardQuizElem from "./CardQuizElem";
import CardQuizOptions from "./CardQuizOptions";
export default function CardQuiz() {
  return (
    <div className="flex w-fit -mt-10 h-screen">
      <div className="w-full flex-col flex-center gap-3">
        <div className="flex gap-2">
          <CardQuizElem />
          <CardQuizElem />
          <CardQuizElem />
        </div>
        <CardQuizOptions />
      </div>
    </div>
  );
}
