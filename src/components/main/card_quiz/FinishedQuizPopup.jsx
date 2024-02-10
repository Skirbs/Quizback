import Card from "../../reusable/Card";
import bookIcon from "../../../assets/bookIcon.svg";
import {Link} from "react-router-dom";
export default function FinishedQuizPopup(props) {
  return (
    <Card className="flex-col flex-center gap-3 animate-fade-up-bounce px-16 py-4 !rounded-xl">
      <h2 className="text-5xl font-semibold">Congratulations!</h2>
      <img src={bookIcon} alt="book icon" className="w-16 mb-2 animate-rotate-slight-left" />
      <p className="text-xl">You have finished all of your cards!</p>
      <Link to="/Quizback" className="px-3 py-1 rounded-full bg-neutral-200 dark:bg-neutral-900">
        Go back
      </Link>
    </Card>
  );
}
