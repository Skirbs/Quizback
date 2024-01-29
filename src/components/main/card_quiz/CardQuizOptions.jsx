import Button from "../../reusable/Button";
export default function CardQuizOptions({onNextCard}) {
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
        <p>I quite understand it</p>
        <p className="text-xs">(Repeat Tomorrow)</p>
      </Button>
      <Button
        className="flex-center flex-col flex-1 rounded-lg"
        onClick={() => {
          onNextCard(2);
        }}>
        <p>I fully understand it!</p>
        <p className="text-xs">(Repeat After 3 Days)</p>
      </Button>
    </div>
  );
}
