import Button from "./Button";
import {Link} from "react-router-dom";

export default function PageActions({children, isCardGroup}) {
  function GroupListAction() {
    return (
      <>
        <Link className="bg-white dark:bg-neutral-800 drop-shadow-md rounded-full flex-center w-[3rem] h-[3rem] absolute inset-x-0 -top-[3.2rem]">
          <span className="material-symbols-outlined text-3xl">add</span>
          <p className="absolute h-[2rem] top-[0.5rem] right-[3.25rem] overflow-hidden p-2 rounded-md bg-white dark:bg-neutral-800 whitespace-nowrap pointer-events-none flex items-center">
            Create Card
          </p>
        </Link>
        <Link className="bg-white dark:bg-neutral-800 drop-shadow-md rounded-full flex-center w-[3rem] h-[3rem] absolute inset-x-0 -top-[6.4rem]">
          <span className="material-symbols-outlined text-3xl">quiz</span>
          <p className="absolute h-[2rem] top-[0.5rem] right-[3.25rem] overflow-hidden p-2 rounded-md bg-white dark:bg-neutral-800 whitespace-nowrap pointer-events-none flex items-center">
            Quiz
          </p>
        </Link>
      </>
    );
  }

  function CardGroupAction() {
    return (
      <>
        <Button className="w-[3rem] h-[3rem] z-10" noOpacityChange>
          <span className="material-symbols-outlined text-3xl">expand_less</span>
        </Button>
      </>
    );
  }

  return (
    <div className="fixed z-50 right-4 bottom-4 [&:nth-child(0)]:opacity-25">
      <Button className="w-[3rem] h-[3rem] z-50 relative">
        <span className="material-symbols-outlined text-3xl">expand_less</span>
      </Button>
      {isCardGroup ? <GroupListAction /> : <CardGroupAction />}
    </div>
  );
}
