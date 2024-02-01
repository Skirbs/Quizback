import Button from "../../reusable/Button";
import getSpacedRepetitionDays from "../../../store/SpacedRepetitionFormat";
export default function CardQuizOptions({onNextCard, cardPerfectAmt}) {
  let quiteUnderstoodDays = getSpacedRepetitionDays(cardPerfectAmt - 1);

  const fullyUnderstoodDays = getSpacedRepetitionDays(cardPerfectAmt);
  return (
    <div className="self-center flex flex-col sm:flex-row justify-center items-stretch w-[75vw] gap-2 sm:px-24">
      <Button
        className="flex-center flex-col flex-1 rounded-lg"
        onClick={() => {
          onNextCard(0);
        }}>
        <p>I dont understand it</p>
        <p className="text-xs">(Repeat next session)</p>
      </Button>
      <Button
        className="flex-center flex-col flex-1 rounded-lg"
        onClick={() => {
          onNextCard(1);
        }}>
        <p>I quite understood it</p>
        <p className="text-xs">
          (Repeat {quiteUnderstoodDays === 1 ? "Tommorow" : `${quiteUnderstoodDays} Days`})
        </p>
      </Button>
      <Button
        className="flex-center flex-col flex-1 rounded-lg"
        onClick={() => {
          onNextCard(2);
        }}>
        <p>I fully understood it!</p>
        <p className="text-xs">(Repeat After {fullyUnderstoodDays} Days)</p>
      </Button>
    </div>
  );
}
