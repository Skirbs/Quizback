import Button from "../../reusable/Button";
export default function CardQuizOptions() {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-stretch w-[75vw] gap-2 sm:px-24">
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
  );
}
