import Button from "../../reusable/Button";
import Card from "../../reusable/Card";
import CardQuizElem from "./CardQuizElem";
export default function CardQuiz() {
  return (
    <div className="flex w-fit -mt-10 h-screen">
      <div className="w-full flex-col flex-center gap-3">
        <CardQuizElem />
        <div className="flex justify-center items-stretch w-full gap-3 px-24">
          <Button className="flex-center flex-col rounded-lg">
            <span className="material-symbols-outlined">chevron_left</span>
          </Button>
          <Button className="flex-center flex-col flex-1 rounded-lg">
            <p>I dont understand it</p>
            <p className="text-xs">(Repeat next session)</p>
          </Button>
          <Button className="flex-center flex-col flex-1 rounded-lg">
            <p>I quite understand it</p>
            <p className="text-xs">(Repeat Tomorrow)</p>
          </Button>
          <Button className="flex-center flex-col flex-1 rounded-lg">
            <p>I fully understand it!</p>
            <p className="text-xs">(Repeat After 3 Days)</p>
          </Button>
          <Button className="flex-center flex-col rounded-lg">
            <span className="material-symbols-outlined">chevron_right</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
